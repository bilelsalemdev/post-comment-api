import { NextFunction, Request, Response } from "express";

import { createUser, validatePassword } from "../services/user.service";

import { createUserInput } from "../schema/user.schema";
import { createSendToken } from "../utils/createToken";

import catchAsync from "../utils/catchAsync";

import AppError from "../utils/appError";
import { loginUserInput } from "../schema/session.schema";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export const createUserHandler = catchAsync(
  async (
    req: Request<{}, {}, createUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const newUser = await createUser(req.body);
    createSendToken(newUser, 201, res); //call create user service
  }
);

export const loginHandler = catchAsync(
  async (
    req: Request<{}, {}, loginUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    // const user = await UserModel.findOne({ email }).select("+password");
    const user = await validatePassword({ email, password });
    if (!user) {
      return next(new AppError("Incorrect email or password", 401));
    }
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  }
);
