// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from "jsonwebtoken";
import config from "../../config/config";
import crypto from "crypto";
import dotenv from "dotenv";
import jwtVerifyPromisified from "../utils/promisify";

import UserModel from "../models/user.model";

import catchAsync from "../utils/catchAsync";

import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";
dotenv.config({ path: "../config.env" });
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Getting token and check of it's there
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    // 2) Verification token
    const decoded: any = await jwtVerifyPromisified(token, config.JWT_SECRET);
    //const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    // res.locals.user = currentUser;
    res.locals.user = currentUser;
    next();
  }
);

export const restrictTo =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    // roles ['admin', 'user'].
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
