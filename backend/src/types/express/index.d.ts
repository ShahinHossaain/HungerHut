import express from "express";

declare global {
    namespace Express {
      interface Request {
        auth0ld?: string;
        userId?: string;
      }
    }
  }
  