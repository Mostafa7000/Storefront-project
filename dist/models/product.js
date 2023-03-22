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
exports.productBase = void 0;
const database_1 = __importDefault(require("../database"));
class productBase {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("SELECT * FROM products");
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`An error happend while indexing products, ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM products WHERE id=$1";
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length)
                    return result.rows[0];
                else
                    return null;
            }
            catch (err) {
                throw new Error(`An error happend while showing product ${id}, ${err}`);
            }
        });
    }
    create(prod) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
                const result = yield conn.query(sql, [
                    prod.name,
                    prod.price,
                    prod.category,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`An error happend while creating product ${prod}, ${err}`);
            }
        });
    }
}
exports.productBase = productBase;
