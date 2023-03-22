import pool from "../database";

export interface product {
  id?: number;
  name: string;
  price: number;
  category: string;
}

export class productBase {
  async index(): Promise<product[]> {
    try {
      const conn = await pool.connect();
      const result = await conn.query("SELECT * FROM products");
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`An error happend while indexing products, ${err}`);
    }
  }

  async show(id: number): Promise<product | null> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM products WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      if(result.rows.length)
      return result.rows[0];
    else
      return null;
    } catch (err) {
      throw new Error(`An error happend while showing product ${id}, ${err}`);
    }
  }

  async create(prod: product): Promise<product> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        prod.name,
        prod.price,
        prod.category,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `An error happend while creating product ${prod}, ${err}`
      );
    }
  }
}
