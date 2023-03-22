"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
//import { customQueries } from "../../services/dashboard";
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const users = new user_1.userBase();
const products = new product_1.productBase();
//const dashboard = new customQueries();
const orders = new order_1.orderBase();
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
    it("Function creates and returns the newly created order", () => __awaiter(void 0, void 0, void 0, function* () {
        const userID = (yield users.create({
            fname: "Mostafa",
            lname: "Tarek",
            password: "123",
        })).id;
        const result = yield orders.create({
            id: 30,
            user_id: userID,
            status: "active",
        });
        expect(result.user_id).toEqual(userID);
        expect(result.status).toEqual("active");
    }));
    it("Function index should not be empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orders.index();
        expect(result.length).toBeGreaterThan(0);
    }));
    it("Adding product to orders returns the added product", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield products.create({
            name: "Butt Plug",
            price: 50,
            category: "sex toys"
        });
        const product_id = product.id;
        const result = yield orders.addProduct(30, product_id, 5);
        expect(result).toEqual({
            id: product_id,
            name: "Butt Plug",
            price: 50,
            category: "sex toys"
        });
    }));
});
