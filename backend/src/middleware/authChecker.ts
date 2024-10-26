import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Check for auth using 'Authorization' header
export default function authChecker(req: Request, res: Response, next: NextFunction) {
  const auth_header = req.headers?.authorization;

  if (!auth_header) {
    return res.json({ "success": false, message: "Unauthorized" });
  }
  try {
    jwt.verify(auth_header, "SECRET");
    next();
  }
  catch (err) {
    return res.json({ success: false, message: "Invalid Auth header" })
  }
}
