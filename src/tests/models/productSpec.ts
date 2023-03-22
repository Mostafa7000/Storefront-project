import { product, productBase } from "../../models/product";

const products = new productBase();

describe("Testing the product model's methods", () => {
  it("Should have index function defined", () => {
    expect(products.index).toBeDefined();
  });
  it("Should have create function defined", () => {
    expect(products.create).toBeDefined();
  });
  it("Should have show function defined", () => {
    expect(products.show).toBeDefined();
  });

  it("Function creates and returns the newly created user", async () => {
    const result = await products.create({
      name: "Lollipop",
      price: 3,
      category: "sweets",
    });
    expect(result.name).toEqual("Lollipop");
    expect(result.price).toEqual(3);
    expect(result.category).toEqual("sweets");
  });
  it("Function index should not be empty", async () => {
    const result = await products.index();
    expect(result.length).toBeGreaterThan(0);
  });
  it("function show returns the correct user", async () => {
    const id = (
      await products.create({
        name: "Ice cream",
        price: 8,
        category: "sweets",
      })
    ).id;
    const result = await products.show(id as number) as product;
    expect(result.name).toEqual("Ice cream");
    expect(result.price).toEqual(8);
    expect(result.category).toEqual("sweets");
  });
});
