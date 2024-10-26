import { Request, Response, NextFunction } from "express";

export default function unknownRoute(req:Request, res:Response, next:NextFunction) {
  return res.send("404: Not Found")
}