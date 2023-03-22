import pool from "../database";
import bcrypt from "bcrypt";
import env from "dotenv";

env.config();

export interface user {
  id?: number;
  fname: string;
  lname: string;
  password: string;
}

export class userBase {
  async index(): Promise<user[]> {
    try {
      const conn = await pool.connect();
      const result = await conn.query("SELECT * FROM users");
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`An error happend during indexing users, ${err}`);
    }
  }

  async create(user: user): Promise<user> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO users (fname, lname, password) VALUES ($1, $2, $3) RETURNING *";
      const passwordDigest = bcrypt.hashSync(
        user.password + (process.env.PEPPER as string),
        parseInt(process.env.SALT as string)
      );
      const result = await conn.query(sql, [
        user.fname,
        user.lname,
        passwordDigest,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`An error happend while creating user ${user}, ${err}`);
    }
  }

  async show(id: number): Promise<user | null> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM users WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      if(result.rows.length)
        return result.rows[0];
      else
        return null;
    } catch (err) {
      throw new Error(`An error happend while showing user ${id}, ${err}`);
    }
  }

  async authenticate(id: number, password: string): Promise<user | null> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM users WHERE id= $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length) {
        const myUser = result.rows[0];
        if (bcrypt.compareSync(password + process.env.PEPPER, myUser.password))
          return myUser;
      }

      return null;
    } catch (err) {
      throw new Error(
        `An error happend while authenticating user ${id}, ${err}`
      );
    }
  }
}
