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
const dashboard_1 = require("../services/dashboard");
const middlewares_1 = require("../services/middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const products = new product_1.productBase();
const queries = new dashboard_1.customQueries();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products.index();
    res.send(result);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products.show(parseInt(req.params.id));
        res.send(result);
    }
    catch (err) {
        res.status(404).send();
    }
}));
router.post("/", middlewares_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    const result = yield products.create(newProduct);
    res.send(result);
}));
router.get("/top/:num", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield queries.topFiveProducts(parseInt(req.params.num));
        res.send(result);
    }
    catch (err) {
        res.status(404).send();
    }
}));
exports.default = router;
