import { NextFunction, Request, Response } from "express";
import { db } from "../utils/db";
import { BlogsTable, BlogType } from "./blogs.schema";
import { addNewPostSchema } from "./blogs.schema";
import { eq } from "drizzle-orm";


/*
  RETURN ALL BLOG POSTS
*/
export async function returnAllPosts(_: Request, res: Response, next: NextFunction) {
  try {

    // Fetch all blog posts
    const allPosts = await db.select().from(BlogsTable);

    return res.json(allPosts)
  }
  catch (err) {
    next(err);
  }
}


/*
  RETURN A SPECIFIC BLOG POST
*/
export async function returnAPost(req: Request, res: Response, next: NextFunction) {
  const postId = req.params.id;

  try {

    // Fetch a specific blog post
    const post = await db.select().from(BlogsTable).where(eq(BlogsTable.id, postId));

    // TODO: Throw error
    if (post.length === 0) {
      return res.json({success: false, message:"Post not found"});
    }
    return res.json(post);
  }
  catch (err) {
    next(err);
  }
}


/*
  ADD A NEW BLOG POST
*/
export async function addNewPost(req: Request, res: Response, next: NextFunction) {
  const body: BlogType = req.body;

  try {

    // Validate post by user
    const validated = addNewPostSchema.parse(body);

    // Insert blog
    const newPost = (await db.insert(BlogsTable).values(validated).returning())[0];

    if (!newPost) {
      return res.send("Something went wrong")
    }

    return res.json({ success: true, message: newPost.id });
  }
  catch (err) {
    next(err);
  }

}


/*
  DELETE A BLOG POST
*/
export async function deleteAPost(req: Request, res: Response, next: NextFunction) {
  const postId = req.params.id;

  try {

    // Delete post
    const post = await db.delete(BlogsTable).where(eq(BlogsTable.id, postId));

    // If nothing deleted
    if (!post.rowCount || post.rowCount === 0) {
      return res.json({ success: false, message: "Post with provided id not found" });
    }

    return res.json({ success: true })
  }
  catch (err) {
    next(err);
  }
}
