import { Request, Response, NextFunction } from "express";
import { DatabaseError } from "pg";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  if (err instanceof DatabaseError) {
    if (err.code === '23505') {
      return res.json({ success: false, message: "User with this email already exists" });
    }
    else if(err.code === "too_small") {
      return res.json({ success: false, message: "Invalid email/password" });
    }
  }
  return res.json({ success: false, message: "Something went wrong" });
}
