import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoute";

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



app.use("/api/my/user", myUserRoute)

app.use((
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error:", err.message || err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    success: false,
    message,
  });
});

app.listen(7000, () => {
console.log("server started on localhost:7000");

});