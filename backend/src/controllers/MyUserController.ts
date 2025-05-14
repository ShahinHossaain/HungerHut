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

export const updateCurrentUser = async (req: Request, res: Response) => {
    // try {
  
    //    const auth0UserId = req.params.id;
    //    const {name,addressLine1, city, country} = req.body;

    //    console.log(auth0UserId, name, addressLine1, city)
   
  
    //   // 🟢 Step 3: Update user in DB using Auth0 ID
    //   const updatedUser = await User.findOneAndUpdate(
    //     { auth0Id: auth0UserId },
    //     { name, addressLine1, city, country },
    //     { new: true }
    //   );
  
    //   // 🟠 Step 4: If user not found
    //   if (!updatedUser) {
    //     return res.status(404).json({ message: "User not found" });
    //   }
  
    //   // 🟢 Step 5: Success response
    //   return res.status(200).json({
    //     message: "User information updated successfully",
    //     user: updatedUser,
    //   });
  
    // } 
    
    try{
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;
    
        await user.save();
    
        res.send(user);
    }
    catch (error) {
      // 🔴 Step 6: Error handling
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

