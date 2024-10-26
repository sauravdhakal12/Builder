import express  from "express";
const app = express();

import blogRouter from "./src/blogs/blogs.routes";
import userRouter from "./src/auth/auth.routes";
import unknownRoute from "./src/middleware/unknownRoute";
import errorHandler from "./src/middleware/errorHandler";
import { PORT } from "./src/utils/config";

app.use(express.json());
app.use("/blog", blogRouter)
app.use("/user", userRouter)

app.use(unknownRoute);
app.use(errorHandler);

const P = PORT || 4000;

app.listen(P, () => {
  console.log(`Listening on port ${P}`);
})