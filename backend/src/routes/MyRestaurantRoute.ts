import express from "express";
import multer from "multer";
import { createMyRestaurant } from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
import { Request, Response, NextFunction } from "express";



const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
  
// /api/my/restaurant
router.post("/", upload.single("imageUrl"),validateMyRestaurantRequest , jwtCheck ,jwtParse, async (req:Request, res:Response, next:NextFunction) => {
    try {
        console.log("try")
        await createMyRestaurant(req, res);
    } catch (error) {
        console.log("catch")
        next(error);
    }
});

export default router;
 