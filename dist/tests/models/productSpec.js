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
const product_1 = require("../../models/product");
const products = new product_1.productBase();
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
    it("Function creates and returns the newly created user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield products.create({
            name: "Lollipop",
            price: 3,
            category: "sweets",
        });
        expect(result.name).toEqual("Lollipop");
        expect(result.price).toEqual(3);
        expect(result.category).toEqual("sweets");
    }));
    it("Function index should not be empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield products.index();
        expect(result.length).toBeGreaterThan(0);
    }));
    it("function show returns the correct user", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = (yield products.create({
            name: "Ice cream",
            price: 8,
            category: "sweets",
        })).id;
        const result = yield products.show(id);
        expect(result.name).toEqual("Ice cream");
        expect(result.price).toEqual(8);
        expect(result.category).toEqual("sweets");
    }));
});
