import express, { Request, Response, NextFunction } from 'express';
import { param } from 'express-validator';
import { searchRestaurants } from '../controllers/ResturantController';

const router = express.Router();

router.get("/search/:city",
     param("city").isString().trim().notEmpty().withMessage("City parameter must be a valid string"),
      async (req:Request, res:Response, next:NextFunction) => {
  try {
      console.log("try")
      await searchRestaurants(req, res, next);
  } catch (error) {
      console.log("catch")
      next(error);
  }
});

export default router;