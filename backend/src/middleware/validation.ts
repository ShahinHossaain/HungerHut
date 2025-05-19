import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in validation")
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    (error as any).status = 400;
    (error as any).message = errors.array(); 
    return next(error);
  }
  next();

};
export const validateMyUserRequest = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name must be a string"),

  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),

  body("city")
    .isString()
    .notEmpty()
    .withMessage("City must be a string"),

  body("country")
    .isString()
    .notEmpty()
    .withMessage("Country must be a string"),
  handleValidationErrors
];


export const validateMyRestaurantRequest = [
  body("restaurantName")
    .notEmpty()
    .withMessage("Restaurant name is required"),

  body("city")
    .notEmpty()
    .withMessage("City is required"),

  body("country")
    .notEmpty()
    .withMessage("Country is required"),

  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),

  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a positive integer"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .notEmpty()
    .withMessage("Cuisines array cannot be empty"),

  body("menuItems")
    .isArray()
    .withMessage("Menu items must be an array"),

  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu item name is required"),

  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a positive number"),
  handleValidationErrors
];
