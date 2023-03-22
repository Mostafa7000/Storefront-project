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
exports.orderBase = void 0;
const database_1 = __importDefault(require("../database"));
const product_1 = require("./product");
const products = new product_1.productBase();
class orderBase {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("SELECT * FROM orders");
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`An error happend while indexing orders, ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE id=$1";
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length)
                    return result.rows[0];
                else
                    return null;
            }
            catch (err) {
                throw new Error(`An error happend while showing order ${id}, ${err}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO orders (id, user_id, status) VALUES ($1, $2, $3) RETURNING *";
                const result = yield conn.query(sql, [
                    order.id,
                    order.user_id,
                    order.status,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`An error happend while creating order ${order}, ${err}`);
            }
        });
    }
    addProduct(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *";
                yield conn.query(sql, [order_id, product_id, quantity]);
                const result = yield products.show(product_id);
                conn.release();
                return result;
            }
            catch (err) {
                throw new Error(`An error happend while adding product ${product_id} to order ${order_id}, ${err}`);
            }
        });
    }
    completeOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const completeOrder = yield this.show(order_id);
                const idSQL = "SELECT products.name as name, order_id as id FROM orders_products JOIN products ON product_id=products.id and order_id=$1";
                const ids = (yield conn.query(idSQL, [order_id])).rows;
                completeOrder.productIDs = ids;
                const quantitySql = "SELECT products.name as name, quantity as quantity FROM orders_products JOIN products ON product_id=products.id and order_id=$1";
                const quantities = (yield conn.query(quantitySql, [order_id])).rows;
                completeOrder.productQuantities = quantities;
                return completeOrder;
            }
            catch (err) {
                throw new Error(`An error happend while returning completeOrder ${order_id}, ${err}`);
            }
        });
    }
}
exports.orderBase = orderBase;
