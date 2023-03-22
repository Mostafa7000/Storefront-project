import express from "express";
import cors from "cors";
import users_routes from "./routes/users";
import orders_routes from "./routes/orders";
import products_routes from "./routes/products";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/users", users_routes);
app.use("/orders", orders_routes);
app.use("/products", products_routes);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

export default app;