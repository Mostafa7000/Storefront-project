import pool from "../database";
import { product,productBase } from "./product";

const products= new productBase();

export interface order {
  id?: number;
  user_id: number;
  status: string;
  productQuantities?: { name: string; quantity: number }[];
  productIDs?: { name: string; id: number }[];
}

export class orderBase {
  async index(): Promise<order[]> {
    try {
      const conn = await pool.connect();
      const result = await conn.query("SELECT * FROM orders");
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`An error happend while indexing orders, ${err}`);
    }
  }
  async show(id: number): Promise<order | null> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT * FROM orders WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      if(result.rows.length)
        return result.rows[0];
      else
        return null;
    } catch (err) {
      throw new Error(`An error happend while showing order ${id}, ${err}`);
    }
  }
  async create(order: order): Promise<order> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO orders (id, user_id, status) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        order.id,
        order.user_id,
        order.status,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`An error happend while creating order ${order}, ${err}`);
    }
  }
  async addProduct(order_id: number, product_id: number, quantity: number): Promise<product>{
    try{
      const conn= await pool.connect();
      const sql= "INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *";
      await conn.query(sql,[order_id, product_id, quantity]);
      const result= await products.show(product_id) as product;
      conn.release();
      return result;
    }
    catch(err){
      throw new Error(`An error happend while adding product ${product_id} to order ${order_id}, ${err}`);
    }
  }
  async completeOrder(order_id: number): Promise<order> {
    try {
      const conn = await pool.connect();
      const completeOrder = await this.show(order_id) as order;

      const idSQL =
        "SELECT products.name as name, order_id as id FROM orders_products JOIN products ON product_id=products.id and order_id=$1";
      const ids = (await conn.query(idSQL, [order_id])).rows;
      completeOrder.productIDs = ids;

      const quantitySql =
        "SELECT products.name as name, quantity as quantity FROM orders_products JOIN products ON product_id=products.id and order_id=$1";
      const quantities = (await conn.query(quantitySql, [order_id])).rows;
      completeOrder.productQuantities = quantities;

      return completeOrder;
    } catch (err) {
      throw new Error(
        `An error happend while returning completeOrder ${order_id}, ${err}`
      );
    }
  }
}
