import { user, userBase } from "../../models/user";
import bcrypt from "bcrypt";
import env from "dotenv";

env.config();

const users = new userBase();

describe("Testing the user model's methods", () => {
  it("Should have index function defined", () => {
    expect(users.index).toBeDefined();
  });
  it("Should have create function defined", () => {
    expect(users.create).toBeDefined();
  });
  it("Should have show function defined", () => {
    expect(users.show).toBeDefined();
  });
  it("Function creates and returns the newly created user", async () => {
    const result = await users.create({
      fname: "Mostafa",
      lname: "Tarek",
      password: "123",
    });
    expect(result.fname).toEqual("Mostafa");
    expect(result.lname).toEqual("Tarek");
    expect(
      bcrypt.compareSync(
        ("123" + process.env.PEPPER) as string,
        result.password
      )
    ).toBeTrue();
  });
  it("Function index should not be empty", async () => {
    const result = await users.index();
    expect(result.length).toBeGreaterThan(0);
  });
  it("function show returns the correct user", async () => {
    const id = (
      await users.create({
        fname: "Ahmed",
        lname: "Fathy",
        password: "0000",
      })
    ).id;
    const result = await users.show(id as number) as user;
    expect(result.fname).toEqual("Ahmed");
    expect(result.lname).toEqual("Fathy");
    expect(
      bcrypt.compareSync(
        ("0000" + process.env.PEPPER) as string,
        result.password
      )
    ).toBeTrue();
  });
});
