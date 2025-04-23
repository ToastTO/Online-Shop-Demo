/*
file name: product.model.js
create date: 2025-04-21
devloper: Anson Chui

description: Export Mongoose model for product.

update log:
2025-04-21: first created.
*/
import mongoose from "mongoose";
const { Schema } = mongoose;

const NAME_ERROR_MSG = "Product name is required";
const PRICE_ERROR_MSG = "Product price is required, must greater than 0";
const CATEGORY_ERROR_MSG = "Product category is required";

const productSchema = new Schema({
        // required fields
        name: {
            type: String,
            required: [true, NAME_ERROR_MSG],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, PRICE_ERROR_MSG],
            min: [0, PRICE_ERROR_MSG],
        },
        category: {
            type: String,
            // required: [true, CATEGORY_ERROR_MSG],
            trim: true,
        },
        stripeProductId: {
            type: String,
            required: true,
            trim: true,
        },
        stripePriceId: {
            type: String,
            required: true,
            trim: true,
        },
        // optional fields
        description: { type: String, trim: true },
        imageUrl: { type: String, trim: true },
    }, { timestamps: true } // automatically add createdAt and updatedAt fields
);

const Product = mongoose.model("Product", productSchema);

export default Product;