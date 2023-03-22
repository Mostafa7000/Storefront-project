import { verify } from "../services/middlewares";
import { customQueries } from "../services/dashboard";
import { orderBase } from "../models/order";
import express from "express";

const dashboard = new customQueries();
const orders= new orderBase();
const router = express.Router();

router.post('/:order_id/products', verify, async(req,res)=>{
  try{
    const result= orders.addProduct(req.body.params.order_id, req.body.product_id, parseInt(req.body.quantity));
    res.send(result);
  }
  catch{
    res.status(400).send();
  }
});

router.get("/active/:user_id", verify, async (req, res) => {
  try {
    const myOrder = await dashboard.activeOrder(parseInt(req.params.user_id));
    res.send(myOrder);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/completed/:user_id", verify, async (req, res) => {
  try {
    const myOrder = await dashboard.completedOrders(
      parseInt(req.params.user_id)
    );
    res.send(myOrder);
  } catch (err) {
    res.status(404).send();
  }
});

export default router;
