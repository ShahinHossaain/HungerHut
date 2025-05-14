import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import User from "../models/userModel";

export const jwtCheck = auth({
    audience: process.env.AUTHO_AUDIENCE,
    issuerBaseURL: process.env.AUTHO_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });


export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  console.log("in jwtParse")

  // যদি authorization না থাকে বা Bearer দিয়ে শুরু না হয়
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return;
  }

  // টোকেন বের করা
  const token = authorization.split(" ")[1];


  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0ld = decoded.sub;
    const user = await User.findOne({ auth0Id: auth0ld });
    if (!user) {
      const error = new Error("User not found");
      (error as any).status = 404;
      return next(error);
    }
    req.auth0ld = auth0ld;
    req.userId = user?._id.toString();
    
   next();
  } catch (error) {
    console.error("JWT decode failed:", error);
    next(error) 
  }};
