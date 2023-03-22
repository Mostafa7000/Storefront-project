import { orderBase } from "../../models/order";
//import { customQueries } from "../../services/dashboard";
import { userBase } from "../../models/user";
import { productBase } from "../../models/product";

const users = new userBase();
const products= new productBase();
//const dashboard = new customQueries();
const orders = new orderBase();

describe("Testing the order model's methods", () => {
  it("Should have index function defined", () => {
    expect(orders.index).toBeDefined();
  });
  it("Should have create function defined", () => {
    expect(orders.create).toBeDefined();
  });
  it("Should have show function defined", () => {
    expect(orders.show).toBeDefined();
  });

  it("Function creates and returns the newly created order", async () => {
    const userID = (
      await users.create({
        fname: "Mostafa",
        lname: "Tarek",
        password: "123",
      })
    ).id;

    const result = await orders.create({
        id: 30,
      user_id: userID as number,
      status: "active",
    });
    expect(result.user_id).toEqual(userID as number);
    expect(result.status).toEqual("active");
  });
  it("Function index should not be empty", async () => {
    const result = await orders.index();
    expect(result.length).toBeGreaterThan(0);
  });
  it("Adding product to orders returns the added product", async()=>{
    const product= await products.create({
      name: "Butt Plug",
      price: 50,
      category: "sex toys"
    })
    const product_id= product.id as number;
    const result= await orders.addProduct(30, product_id, 5);
    expect(result).toEqual({
      id: product_id,
      name: "Butt Plug",
      price: 50,
      category: "sex toys"
    })
  })
});
