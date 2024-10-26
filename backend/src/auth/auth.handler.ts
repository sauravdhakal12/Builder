import { Request, Response, NextFunction } from "express";
import { UserType, UsersTable, createNewUserSchema } from "./auth.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../utils/db";
import { eq } from "drizzle-orm";

// REGISTER NEW USER
export async function registerUser(req: Request, res: Response, next: NextFunction) {

  // Get data
  const body = req.body as UserType;

  try {
    // Validate data
    const validated = createNewUserSchema.parse(body);

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 10);
    validated.password = hashedPassword;

    // Insert into DB
    const newUser = await db.insert(UsersTable).values(validated);
    if (newUser.rowCount === 0) {
      return res.json({success: false, message: "Something went wrong"});
    }

    return res.send({success: true});
  }
  catch (err) {
    next(err);
  }
}


// LOGIN USER
export async function loginUser(req: Request, res: Response, next: NextFunction) {

  // Get data
  const body = req.body as UserType;

  try {

    // Validate data
    const validated = createNewUserSchema.parse(body);

    // Check if user exists
    const dbUser = await db.select().from(UsersTable).where(eq(UsersTable.email, validated.email));
    if (dbUser.length === 0) {
      return res.json({ success: false, message: "Invalid Email/Password" });
    }

    // Check if password hash match
    if (!(await bcrypt.compare(validated.password, dbUser[0].password))) {
      return res.json({ success: false, message: "Invalid Password/Password" });
    }

    // Create a jwt token
    const tokenBody = {
      email: dbUser[0].email,
      signed: new Date()
    };

    const token = jwt.sign(tokenBody, "SECRET");

    // Return token as response
    return res.json({ success: true, token: token });
  }

  catch (err) {
    next(err);
  }
}
