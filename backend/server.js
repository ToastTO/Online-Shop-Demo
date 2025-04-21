/*
file name: server.js
create date: 2025-04-21
devloper: Anson Chui

description: This is the main entry point of the server. It connects to the database, init router and starts the server.

update log:
2025-04-21: first created.
*/

import express from "express";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";
import dotenv from "dotenv";
dotenv.config(); // load env variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // middleware allow us to accept json data from body

app.use("/api/product", productRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
