import express from "express";
import  { createCurrentUser, updateCurrentUser } from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

router.post("/",jwtCheck, async (req, res, next) => {
    try {
        await createCurrentUser(req, res);
    } catch (error) {
        next(error);
    }
});

router.put("/",jwtCheck, jwtParse, validateMyUserRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateCurrentUser(req, res);
    } catch (error) {
        next(error);
    }
})



export default router;
    