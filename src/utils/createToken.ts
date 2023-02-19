import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import config from "../../config/config";
import { UserDocument } from "../models/user.model";
dotenv.config({ path: "../config.env" });
const signToken = (id: any) =>
  jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });

export const createSendToken = (
  user: UserDocument,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user._id);
  if (token) {
    const cookieOptions: {
      expires: Date;
      httpOnly: boolean;
    } = {
      expires: new Date(
        Date.now() +
          parseInt(config.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  }
};
