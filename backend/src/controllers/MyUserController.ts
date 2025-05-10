import { Request, Response } from "express";
import User from "../models/userModel";

export const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });

        if (existingUser) {
            return res.status(200).json(existingUser.toObject());
        }

        const newUser = new User(req.body);
        await newUser.save();
        
        return res.status(201).json(newUser.toObject());
        
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message, });
    }
};