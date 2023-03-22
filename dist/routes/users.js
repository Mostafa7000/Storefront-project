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
const user_1 = require("../models/user");
const middlewares_1 = require("../services/middlewares");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const router = express_1.default.Router();
const users = new user_1.userBase();
router.get("/", middlewares_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myUsers = yield users.index();
    res.send(myUsers);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        fname: req.body.fname,
        lname: req.body.lname,
        password: req.body.password,
    };
    const myUser = yield users.create(newUser);
    const token = jsonwebtoken_1.default.sign({ user: myUser }, process.env.JWT_SECRET_PHRASE);
    res.send(token);
}));
router.post("/authenticate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.body.id);
        const pass = req.body.password;
        const myUser = yield users.authenticate(id, pass);
        const token = jsonwebtoken_1.default.sign({ user: myUser }, process.env.JWT_SECRET_PHRASE);
        res.send(token);
    }
    catch (_a) {
        res.status(401).send("Couldn't authenticate");
    }
}));
router.get("/:id", middlewares_1.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users.show(parseInt(req.params.id));
        if (result)
            res.send(result);
        else
            res.status(404).send();
    }
    catch (err) {
        res.status(400).send();
    }
}));
exports.default = router;
