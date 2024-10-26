import express from "express";
const blogRouter = express.Router();

import { addNewPost, deleteAPost, returnAllPosts, returnAPost } from "./blogs.handler";
import authChecker from "../middleware/authChecker";

blogRouter.get("/", returnAllPosts);
blogRouter.post("/add", authChecker, addNewPost);
blogRouter.get("/:id", returnAPost);
blogRouter.delete("/:id", authChecker, deleteAPost);

export default blogRouter;