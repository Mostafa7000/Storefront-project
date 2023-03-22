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
exports.userBase = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class userBase {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("SELECT * FROM users");
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`An error happend during indexing users, ${err}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO users (fname, lname, password) VALUES ($1, $2, $3) RETURNING *";
                const passwordDigest = bcrypt_1.default.hashSync(user.password + process.env.PEPPER, parseInt(process.env.SALT));
                const result = yield conn.query(sql, [
                    user.fname,
                    user.lname,
                    passwordDigest,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`An error happend while creating user ${user}, ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users WHERE id=$1";
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length)
                    return result.rows[0];
                else
                    return null;
            }
            catch (err) {
                throw new Error(`An error happend while showing user ${id}, ${err}`);
            }
        });
    }
    authenticate(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users WHERE id= $1";
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length) {
                    const myUser = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + process.env.PEPPER, myUser.password))
                        return myUser;
                }
                return null;
            }
            catch (err) {
                throw new Error(`An error happend while authenticating user ${id}, ${err}`);
            }
        });
    }
}
exports.userBase = userBase;
