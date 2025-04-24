/*
file name: product.route.js
create date: 2025-04-21
devloper: Anson Chui

description: product routing for handling product related requests.
route:
METHOD      URL                     DESCRIPTION
  GET       /api/product            : get all products
  POST      /api/product            : create a new product
  PUT       /api/product/:id        : update a product by id
  DELETE    /api/product/all        : delete all products
  DELETE    /api/product/:id        : delete a product by id

update log:
2025-04-21: first created.
*/

import express from "express";
import {
    getProducts,
    createProduct,
    deleteProduct,
    deleteAllProducts,
    updateProduct,
    createCheckoutSession,
} from "../api.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/all", deleteAllProducts);
router.delete("/:id", deleteProduct);

export default router;