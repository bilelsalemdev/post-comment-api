import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { fromZodError } from "zod-validation-error";
import AppError from "../utils/appError";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return next(fromZodError(e));
      // return next(new AppError(e, 400));
    }
  };

export default validate;
