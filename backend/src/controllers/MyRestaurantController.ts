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

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl =imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);

    await restaurant.save();

    res.status(201).json(restaurant);
    

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateMyRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
if (!restaurant) {
  next(new ApiError(404, "Restaurant not found"));
  return;
}
restaurant.restaurantName = req.body.restaurantName;
restaurant.city = req.body.city;
restaurant.country = req.body.country;
restaurant.deliveryPrice = req.body.deliveryPrice;
restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
restaurant.cuisines = req.body.cuisines;
restaurant.menuItems = req.body.menuItems;

if (req.file) {
  const imageUrl = await uploadImage(req.file as Express.Multer.File);
  restaurant.imageUrl = imageUrl;
}

restaurant.save();
res.status(200).json(restaurant);
   
    res.json(restaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    next(new ApiError(500, "Something went wrong"));
  }

};

const uploadImage = async (file: Express.Multer.File) => {
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
}
 