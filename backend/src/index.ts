import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_CONNECTION as string)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });


const app = express();

app.use(express.json())
app.use(cors())

app.get("/test", async (req: Request, res: Response) => {
 res.json({ message: "Hello!" });

});

app.listen(7000, () => {
console.log("server started on localhost:7000");

});