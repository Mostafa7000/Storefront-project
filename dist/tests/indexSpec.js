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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const products = new product_1.productBase();
const server = (0, supertest_1.default)(index_1.default);
const auth = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmbmFtZSI6Ik1vc3RhZmEiLCJsbmFtZSI6IkVtYWQiLCJwYXNzd29yZCI6IiQyYiQwNyRoLzluem82SmU2Vy9zdmxaRTNGdk11Nmx1TjZhRDRVekpiOGhWTFVrWXVjRkcxejVEMTFpdSJ9LCJpYXQiOjE2Njg0MTY0MTN9.reHc5TFLkJm2fd6dnoCL_81COICp6l7yBtpfDP_yrAg"
};
describe("Testing app end points", () => {
    describe("User endpoints", () => {
        it("Should return 200 OK for creating new user", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield server.post('/users').send({
                fname: "Mostafa",
                lname: "Tarek",
                password: "12345"
            });
            expect(result.status).toEqual(200);
        }));
        it("Should return 200 OK for indexing", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield server.get('/users').set(auth);
            expect(result.status).toEqual(200);
        }));
        it("Should return 404 NOT FOUND when showing a non-existing user", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield server.get('/users/55').set(auth);
            expect(result.status).toEqual(404);
        }));
    });
    describe(" Testing Product end points", () => {
        it("Should return 200 OK for creating new product", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield server.post('/products').send({
                name: "IPhone",
                price: 35000,
                category: "cell phones"
            }).set(auth);
            expect(result.status).toEqual(200);
        }));
        it("Should return 200 OK for indexing", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield server.get('/products');
            expect(result.status).toEqual(200);
        }));
        it("Should return 200 OK when showing an existing product", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = (yield products.create({
                name: "Jelly beans",
                price: 5,
                category: "sweets",
            })).id;
            const result = yield server.get('/products/' + id);
            expect(result.status).toEqual(200);
        }));
        it("Should return 200 OK when searching for top five popular products", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield server.get("/products/top/5");
            expect(result.status).toEqual(200);
        }));
    });
    describe("Testing order end points", () => {
        it("Should return 400 BAD REQUEST for adding product to non-existent order", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield server.post('/orders/30/products').send({
                name: "Dell G5",
                price: 20000,
                category: "Laptops"
            }).set(auth);
            expect(result.status).toEqual(400);
        }));
        it("Should return 401 for not including JWT token in the header", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield server.get('/orders/active/1');
            expect(result.status).toEqual(401);
        }));
    });
});
