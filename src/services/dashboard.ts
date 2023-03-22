import { order, orderBase } from "../models/order";
import { product, productBase } from "../models/product";
import pool from "../database";

const orders = new orderBase();
const products = new productBase();

export class customQueries {
  async activeOrder(userID: number): Promise<order | null> {
    try {
      const conn = await pool.connect();
      const sql = "SELECT id FROM orders WHERE user_id=$1 AND status='active'";
      const activeOrder = (await conn.query(sql, [userID])).rows;
      conn.release();
      if (activeOrder.length) {
        const activeOrderID = activeOrder[0].id;
        const myOrder = await orders.completeOrder(activeOrderID);
        return myOrder;
      }
      return null;
    } catch (err) {
      throw new Error(`An error happened in custom query: activeOrder, ${err}`);
    }
  }
  async completedOrders(userID: number): Promise<order[] | null> {
    try {
      const result: order[] = [];
      const conn = await pool.connect();
      const sql =
        "SELECT id FROM orders WHERE user_id=$1 AND status='complete'";
      const activeOrdersIDs = (await conn.query(sql, [userID])).rows; //list of objects containing just 'id'
      conn.release();
      if (activeOrdersIDs.length) {
        for (const order of activeOrdersIDs) {
          result.push(await orders.completeOrder(order.id));
        }
        return result;
      }
      return null;
    } catch (err) {
      throw new Error(
        `An error happened in custom query: completedOrders, ${err}`
      );
    }
  }

  async topFiveProducts(num: number): Promise<product[] | null> {
    try {
      const result: product[] = [];
      const conn = await pool.connect();
      const sql =
        "SELECT product_id FROM orders_products GROUP BY product_id ORDER BY COUNT(*) DESC LIMIT $1";
      const ordersIDs = (await conn.query(sql, [num])).rows;
      conn.release();
      if (ordersIDs.length) {
        for (const obj of ordersIDs) {
          const id = parseInt(obj.product_id);
          result.push(await products.show(id) as product);
        }
        return result;
      }
      return null;
    } catch (err) {
      throw new Error(
        `An error happened in custom query: topFiveProducts, ${err}`
      );
    }
  }
}
