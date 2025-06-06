import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utilities/ApiError";
import Restaurant from "../models/restaurantModel";

export const searchRestaurants = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const city = req.params.city;
        const searchQuery = (req.query.search as string) || "";
        const selectedCuisines = (req.query.cuisine as string) || "";
        const sortOption = (req.query.sort as string) || "lastUpdated";
        const page = parseInt(req.query.page as string) || 1;

        let query : any = {};

        query["city"] = new RegExp(city, "i");
        const cityCheck = await Restaurant.countDocuments(query);

        if(cityCheck === 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1,
                }
            });
        }

        if (selectedCuisines) {
            const cuisinesArray = selectedCuisines
                .split(",")
                .map((cuisine) => new RegExp(cuisine, "i"));
        
            query["cuisines"] = { $all: cuisinesArray };
        }

        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");
            console.log("searchRegex", searchRegex);
            query["$or"] = [
              { restaurantName: searchRegex },
              { cuisines: { $in: [searchRegex] } },
              { "menuItems.name": searchRegex }
            ];
          }

        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        const restaurants = await Restaurant.find(query).skip(skip).limit(pageSize).sort({[sortOption]: 1}).lean();

        const total = await Restaurant.countDocuments(query);

        
        const response = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize),
            }
        };
        
        res.json(response);
          
        
    } catch (error) {
        console.log(error);
        next(new ApiError(500, "Internal Server Error"));
    }
}