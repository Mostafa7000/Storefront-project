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
const user_1 = require("../../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const users = new user_1.userBase();
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
    it("Function creates and returns the newly created user", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield users.create({
            fname: "Mostafa",
            lname: "Tarek",
            password: "123",
        });
        expect(result.fname).toEqual("Mostafa");
        expect(result.lname).toEqual("Tarek");
        expect(bcrypt_1.default.compareSync(("123" + process.env.PEPPER), result.password)).toBeTrue();
    }));
    it("Function index should not be empty", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield users.index();
        expect(result.length).toBeGreaterThan(0);
    }));
    it("function show returns the correct user", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = (yield users.create({
            fname: "Ahmed",
            lname: "Fathy",
            password: "0000",
        })).id;
        const result = yield users.show(id);
        expect(result.fname).toEqual("Ahmed");
        expect(result.lname).toEqual("Fathy");
        expect(bcrypt_1.default.compareSync(("0000" + process.env.PEPPER), result.password)).toBeTrue();
    }));
});
