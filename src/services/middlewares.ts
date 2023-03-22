import express from "express";
import jwt from "jsonwebtoken";

export const verify: express.RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error();
    jwt.verify(token, process.env.JWT_SECRET_PHRASE as string);
    next();
  } catch {
    res.status(401);
    res.json("Invalid token");
  }
};
