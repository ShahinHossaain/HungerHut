import express from "express";
import  { createCurrentUser } from "../controllers/MyUserController";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        await createCurrentUser(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
    