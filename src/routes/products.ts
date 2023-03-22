import { product, productBase } from "../models/product";
import { customQueries } from "../services/dashboard";
import { verify } from "../services/middlewares";
import express from "express";

const router = express.Router();
const products = new productBase();
const queries = new customQueries();

router.get("/", async (_req, res) => {
  const result = await products.index();
  res.send(result);
});
router.get("/:id", async (req, res) => {
  try {
    const result = await products.show(parseInt(req.params.id));
    res.send(result);
  } catch (err) {
    res.status(404).send();
  }
});
router.post("/", verify, async (req, res) => {
  const newProduct: product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  const result = await products.create(newProduct);
  res.send(result);
});
router.get("/top/:num", async (req, res) => {
  try {
    const result = await queries.topFiveProducts(parseInt(req.params.num));
    res.send(result);
  } catch (err) {
    res.status(404).send();
  }
});

export default router;
