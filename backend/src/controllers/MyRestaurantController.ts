import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/restaurantModel";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { ApiError } from "../utilities/ApiError";


export const getMyRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return next(new ApiError(404, "Restaurant not found"));
    }
    res.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    next(new ApiError(500, "Something went wrong"));
  }
};


export const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);

    await restaurant.save();

    res.status(201).json(restaurant);
    

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
