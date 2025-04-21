/*
file name: api.js
create date: 2025-04-21
devloper: Anson Chui

description: api callback functions for handling HTTP requests.

update log:
2025-04-21: first created.
*/

import mongoose from "mongoose";
import Product from "./models/product.model.js";

export async function getProducts(req, res) {
  try {
    // get all products from mongoDB
    const products = await Product.find();
    // return the products
    res.status(200).send({
      res: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.log(err.message);
    // return 500 server error
    res.status(500).json({
      res: false,
      message: "unknow Server error",
    });
  }
}

export async function createProduct(req, res) {
  // console.log(req);
  const product = req.body;
  const newProduct = new Product(product);

  try {
    // try to save the product on mongoDB
    await newProduct.save();
    res.status(201).send({
      res: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    // check if its a validation error, return 400 Bad request
    if (err instanceof mongoose.Error.ValidationError) {
      console.log("There is an Validation Error");

      let msg = [];

      for (const key in err.errors) {
        msg.push(err.errors[key].message);
      }

      // return 400 bad request
      res.status(400).json({
        res: false,
        message: msg,
      });
    } else {
      // check if other errors, return 500 server error
      console.log(err.message);

      // return 500 server error
      res.status(500).json({
        res: false,
        message: "unknow Server error",
      });
    }
  }
}

export async function updateProduct(req, res) {
  // console.log(req);
  const updates = req.body;
  const { id } = req.params;

  // check if the id is valid or not, sent 404
  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({
      res: false,
      message: "product Id is not valid / not found",
    });
  }

  try {
    // try to save the product on mongoDB
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    res.status(201).send({
      res: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    // check if its a validation error, return 400 Bad request
    if (err instanceof mongoose.Error.ValidationError) {
      console.log("There is an Validation Error");

      let msg = [];

      for (const key in err.errors) {
        msg.push(err.errors[key].message);
      }

      // return 400 bad request
      res.status(400).json({
        res: false,
        message: msg,
      });
    } else {
      // check if other errors, return 500 server error
      console.log(err.message);

      // return 500 server error
      res.status(500).json({
        res: false,
        message: "unknow Server error",
      });
    }
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  console.log(id);

  // check if the id is valid or not, sent 404
  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({
      res: false,
      message: "product Id is not valid / not found",
    });
  }

  try {
    // try to delete the product on mongoDB
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).send({
      res: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
    // return 500 server error.
    res.status(500).json({
      res: false,
      message: "server error",
    });
  }
}

export async function deleteAllProducts(req, res) {
  try {
    // try to delete the product on mongoDB
    const query = await Product.deleteMany();
    res.status(200).send({
      res: true,
      message: `total ${query["deletedCount"]} Product deleted successfully`,
    });
  } catch (err) {
    console.log(err.message);
    // return 500 server error
    res.status(500).json({
      res: false,
      message: "unknow Server error",
    });
  }
}
