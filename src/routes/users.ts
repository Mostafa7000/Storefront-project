import { user, userBase } from "../models/user";
import { verify } from "../services/middlewares";
import express from "express";
import env from "dotenv";
import jwt from "jsonwebtoken";

env.config();

const router = express.Router();
const users = new userBase();

router.get("/", verify, async (req, res) => {
  const myUsers = await users.index();
  res.send(myUsers);
});

router.post("/", async (req, res) => {
  const newUser: user = {
    fname: req.body.fname as string,
    lname: req.body.lname,
    password: req.body.password,
  };
  const myUser = await users.create(newUser);

  const token = jwt.sign(
    { user: myUser },
    process.env.JWT_SECRET_PHRASE as string
  );

  res.send(token);
});

router.post("/authenticate", async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    const pass = req.body.password;
    const myUser = await users.authenticate(id, pass);
    const token = jwt.sign(
      { user: myUser },
      process.env.JWT_SECRET_PHRASE as string
    );
    res.send(token);
  }
  catch{
    res.status(401).send("Couldn't authenticate")
  }
  
});

router.get("/:id", verify, async (req, res) => {
  try {
    const result = await users.show(parseInt(req.params.id));
    if (result)
      res.send(result);
    else
      res.status(404).send();
  } catch (err) {
    res.status(400).send();
  }
});

export default router;
