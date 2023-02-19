import { NextFunction, Response } from "express";
import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import PubModel, { PubDocument } from "../models/pub.model";
import { UserDocument } from "../models/user.model";
import AppError from "../utils/appError";

export async function createPub(input: DocumentDefinition<PubDocument>) {
  try {
    const pub = await PubModel.create(input);

    return pub;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const setPubUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body?.user) req.body.user = res.locals.user;
  next();
};

export async function deletePub(
  id: FilterQuery<PubDocument>,
  user: FilterQuery<UserDocument>
) {
  try {
    const pubDeleted = await PubModel.findById(id);
    const pubDeletedUserId = pubDeleted?.user.toString();
    const userId = user._id.toString();
    if (user.role === "user") {
      if (pubDeletedUserId === userId) {
        const pubDeleted = await PubModel.findByIdAndDelete(id);

        return pubDeleted;
      }
    } else if (user.role === "admin") {
      const pubDeleted = await PubModel.findByIdAndDelete(id);
      return pubDeleted;
    }
  } catch (err: any) {
    return new AppError(err, 404);
  }
}

export async function getAllPubs() {
  try {
    const pubs = await PubModel.find();
    return pubs;
  } catch (error) {
    return new AppError(error, 404);
  }
}
