/*
file name: db.js
create date: 2025-04-21
devloper: Anson Chui

description: For connecting MongoDB database.

update log:
2025-04-21: first created.
*/

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // 1 code indicates an error, 0 indicates success
  }
};
