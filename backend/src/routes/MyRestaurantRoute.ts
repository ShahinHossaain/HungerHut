import express from "express";
import multer from "multer";
import { createMyRestaurant, getMyRestaurant } from "../controllers/MyRestaurantController";
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
router.post("/",
   upload.single("imageFile"),validateMyRestaurantRequest , jwtCheck ,jwtParse, async (req:Request, res:Response, next:NextFunction) => {
    try {
        console.log("try")
        await createMyRestaurant(req, res);
    } catch (error) {
        console.log("catch")
        next(error);
    }
});

// router.post("/", upload.single("imageFile"), (req: Request, res: Response) => {
//   req.body.menuItems = req.body.menuItems.map((item: any) => ({
//     ...item,
//     price: parseFloat(item.price),
//   }));
  
//   console.log("req.body =>", req.body); // parsed form fields (text)
//   console.log("req.file =>", req.file); // uploaded file (imageFile)
  
//   res.status(200).json({ message: "Form data received" });
// });

router.get("/",jwtCheck, jwtParse, async (req:Request, res:Response, next:NextFunction) => {
  try {
      console.log("try")
      await getMyRestaurant(req, res, next);
  } catch (error) {
      console.log("catch")
      next(error);
  }
})

export default router;
 