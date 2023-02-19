import app from "./app";
import dotenv from "dotenv";
import connect from "./utils/connect";
import routes from "./routes";
import config from "../config/config";
import AppError from "./utils/appError";
import { NextFunction, Request, Response } from "express";
dotenv.config({ path: "../config.env" });
const port = config.PORT || 3000;

app.listen(port, async () => {
  console.log(`app is running on port ${port}`);
  await connect();
  routes(app);
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
});
