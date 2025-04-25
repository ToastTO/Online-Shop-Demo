/*
file name: api.js
create date: 2025-04-21
devloper: Anson Chui

description: api callback functions for handling HTTP requests.

update log:
2025-04-21: first created.
2025-04-23: update api to create, deleted, updated Stripe Product and Prices object
                createProduct:      Create Stripe product, Create Stripe prices for that product
                updateProduct:      Update Stripe Product Name and Des, deactivating current prices and create new Prices object if Price updated. 
                deleteProduct:      deactivate Stripe product and prices.
                deleteAllProduct:   Deactivate all Stripe product and prices.
2025-04-24: fixed empty description bug @create function.
2025-04-24: added Stripe Checkout Session demo.
2025-04-25: added sessionStatus api
*/

import mongoose from "mongoose";
import Product from "./models/product.model.js";
import dotenv from "dotenv";
import Stripe from "stripe";

// golbal constant
const CURRENCY = "hkd";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_API_Secret_KEY);
// console.log(process.env.STRIPE_API_Secret_KEY);

export async function getProducts(req, res) {
    console.log("getProducts");
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

    // get the product from body
    const product = req.body;

    try {
        let createReq = { name: product.name };
        if (product.description !== "")
            createProduct.description = product.description;

        // create a new product in Stripe
        let stripeProduct, stripePrice;
        stripeProduct = await stripe.products.create(createReq);
        console.log(stripeProduct);

        // create a new price for that product in Stripe
        stripePrice = await stripe.prices.create({
            currency: CURRENCY,
            product: stripeProduct.id,
            unit_amount: product.price * 100, // HKD dor convert to HKD cents
        });

        // add stripeProductId and stripePriceId to the product
        product.stripeProductId = stripeProduct.id;
        product.stripePriceId = stripePrice.id;

        console.log(product);

        // create MongoDB product document
        const newProduct = new Product(product);
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

    console.log(updates, id);

    // check if the id is valid or not, sent 400
    if (!mongoose.isValidObjectId(id)) {
        console.log("not valid id, ");
        res.status(400).json({
            res: false,
            message: "invalid id",
        });
    }

    try {
        // get original Product object
        const originalProduct = await Product.findById(id);
        if (originalProduct === null) {
            // id not found, return 404
            console.log("id not found");
            res.status(404).json({
                res: false,
                message: "product Id is not valid / not found",
            });
        } else {
            // update the product and price on Stripe
            const stripeProduct = await stripe.products.update(
                originalProduct.stripeProductId, {
                    name: updates.name,
                    description: updates.description,
                }
            );
            if (updates.price !== originalProduct.price) {
                // deactivate the old price
                await stripe.prices.update(originalProduct.stripePriceId, {
                    active: false,
                });
                //crate a new price for the updated product
                const stripePrice = await stripe.prices.create({
                    currency: CURRENCY,
                    product: originalProduct.stripeProductId,
                    unit_amount: updates.price * 100, // HKD dor convert to HKD cents
                });
                updates.stripePriceId = stripePrice.id;

                console.log(updates);
            }
            //update in the product
            const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
                new: true,
                runValidators: true,
            });

            res.status(201).send({
                res: true,
                message: "Product updated successfully",
                data: updatedProduct,
            });
        }
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
        res.status(400).json({
            res: false,
            message: "invalid id",
        });
    }
    const originalProduct = await Product.findById(id);
    if (originalProduct === null) {
        // id not found, return 404
        console.log("id not found");
        res.status(404).json({
            res: false,
            message: "product Id is not valid / not found",
        });
    }

    try {
        //deactivate the prodct on stripe
        const stripeProduct = await stripe.products.update(
            originalProduct.stripeProductId, {
                active: false,
            }
        );
        const stripePrice = await stripe.prices.update(
            originalProduct.stripePriceId, {
                active: false,
            }
        );
        // delete the product on mongoDB
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
        // get all the active product on Stripe
        const stripeProducts = await stripe.products.list({
            active: true,
        });
        // loop through the products and deactivate them
        for (const product of stripeProducts.data) {
            await stripe.products.update(product.id, {
                active: false,
            });
        }
        // get all the active prices on Stripe
        const stripePrices = await stripe.prices.list({
            active: true,
        });
        // loop through the prices and deactivate them
        for (const price of stripePrices.data) {
            await stripe.prices.update(price.id, {
                active: false,
            });
        }

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

export async function createCheckoutSession(req, res) {
    console.log("Create Checkout Session");
    // need to get req body -> product info to create a session
    const products = req.body;
    let i = 0;
    let line_items = [];
    for (const product of products) {
        line_items[i++] = {
            price: product.stripePriceId,
            quantity: 1,
        };
    }

    console.log(line_items);

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        ui_mode: "embedded",
        return_url: "http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}",
    });

    res.send({ clientSecret: session.client_secret });
}

export async function sessionStatus(req, res) {
    console.log("sessionStatus");

    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
        status: session.status,
        customer_email: session.customer_details.email,
    });
}