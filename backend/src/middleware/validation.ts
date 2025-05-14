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
