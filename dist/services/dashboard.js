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
exports.customQueries = void 0;
const order_1 = require("../models/order");
const product_1 = require("../models/product");
const database_1 = __importDefault(require("../database"));
const orders = new order_1.orderBase();
const products = new product_1.productBase();
class customQueries {
    activeOrder(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT id FROM orders WHERE user_id=$1 AND status='active'";
                const activeOrder = (yield conn.query(sql, [userID])).rows;
                conn.release();
                if (activeOrder.length) {
                    const activeOrderID = activeOrder[0].id;
                    const myOrder = yield orders.completeOrder(activeOrderID);
                    return myOrder;
                }
                return null;
            }
            catch (err) {
                throw new Error(`An error happened in custom query: activeOrder, ${err}`);
            }
        });
    }
    completedOrders(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = [];
                const conn = yield database_1.default.connect();
                const sql = "SELECT id FROM orders WHERE user_id=$1 AND status='complete'";
                const activeOrdersIDs = (yield conn.query(sql, [userID])).rows; //list of objects containing just 'id'
                conn.release();
                if (activeOrdersIDs.length) {
                    for (const order of activeOrdersIDs) {
                        result.push(yield orders.completeOrder(order.id));
                    }
                    return result;
                }
                return null;
            }
            catch (err) {
                throw new Error(`An error happened in custom query: completedOrders, ${err}`);
            }
        });
    }
    topFiveProducts(num) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = [];
                const conn = yield database_1.default.connect();
                const sql = "SELECT product_id FROM orders_products GROUP BY product_id ORDER BY COUNT(*) DESC LIMIT $1";
                const ordersIDs = (yield conn.query(sql, [num])).rows;
                conn.release();
                if (ordersIDs.length) {
                    for (const obj of ordersIDs) {
                        const id = parseInt(obj.product_id);
                        result.push(yield products.show(id));
                    }
                    return result;
                }
                return null;
            }
            catch (err) {
                throw new Error(`An error happened in custom query: topFiveProducts, ${err}`);
            }
        });
    }
}
exports.customQueries = customQueries;
