"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { HOST, DATABASE, TEST_DATABASE, PASSWORD, USER, ENV } = process.env;
let pool;
if (ENV == "dev") {
    pool = new pg_1.Pool({
        host: HOST,
        database: DATABASE,
        user: USER,
        password: PASSWORD,
    });
}
else {
    pool = new pg_1.Pool({
        host: HOST,
        database: TEST_DATABASE,
        user: USER,
        password: PASSWORD,
    });
}
exports.default = pool;
