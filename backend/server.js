/*
file name: server.js
create date: 2025-04-21
devloper: Anson Chui

description: This is the main entry point of the server. It connects to the database, init router and starts the server.

update log:
2025-04-21: first created.
2025-05-06: added deployment.
*/

import express from "express";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config(); // load env variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
console.log(__dirname);

app.use(express.json()); // middleware allow us to accept json data from body

app.use("/api/product", productRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/chakra-demo/dist")));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "chakra-demo", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
