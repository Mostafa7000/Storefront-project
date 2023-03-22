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
const middlewares_1 = require("../services/middlewares");
const dashboard_1 = require("../services/dashboard");
const order_1 = require("../models/order");
const express_1 = __importDefault(require("express"));
const dashboard = new dashboard_1.customQueries();
const orders = new order_1.orderBase();
const router = express_1.default.Router();
router.post('/:order_id/products', middlewares_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = orders.addProduct(req.body.params.order_id, req.body.product_id, parseInt(req.body.quantity));
        res.send(result);
    }
    catch (_a) {
        res.status(400).send();
    }
}));
router.get("/active/:user_id", middlewares_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myOrder = yield dashboard.activeOrder(parseInt(req.params.user_id));
        res.send(myOrder);
    }
    catch (err) {
        res.status(404).send(err);
    }
}));
router.get("/completed/:user_id", middlewares_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myOrder = yield dashboard.completedOrders(parseInt(req.params.user_id));
        res.send(myOrder);
    }
    catch (err) {
        res.status(404).send();
    }
}));
exports.default = router;
