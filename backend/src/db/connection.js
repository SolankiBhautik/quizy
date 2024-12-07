import mongoose from "mongoose";


import dotenv from "dotenv";
dotenv.config()

const uri = process.env.MONGO_DB || "";

try {
    await mongoose.connect(uri);
    console.log("Mongoose connected to MongoDB!");
} catch (err) {
    console.error("Mongoose connection error:", err);
    process.exit(1);
}
