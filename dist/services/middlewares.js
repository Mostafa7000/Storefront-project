"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            throw new Error();
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_PHRASE);
        next();
    }
    catch (_b) {
        res.status(401);
        res.json("Invalid token");
    }
};
exports.verify = verify;
