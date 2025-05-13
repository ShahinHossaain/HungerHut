import express from "express";
import  { createCurrentUser } from "../controllers/MyUserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

router.post("/",jwtCheck, async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token:", token); 
    try {
        await createCurrentUser(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
    