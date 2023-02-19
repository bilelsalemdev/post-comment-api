import { NextFunction, Request, Response } from "express";
import { createPubInput } from "../schema/pub.schema";
import { createPub, deletePub, getAllPubs } from "../services/pub.service";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

export const createPubHandler = catchAsync(
  async (
    req: Request<{}, {}, createPubInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const newPub = await createPub({ ...req.body, createdAt: new Date() });

    res.status(200).json({
      status: "success",

      data: {
        pub: newPub,
      },
    });
  }
);

export const deletePubHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pub = await deletePub(req.params.pubId, res.locals.user);
    if (!pub) {
      return next(new AppError("No pub found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const getAllPubsHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pubs: object[] = await getAllPubs();
    if (!pubs) {
      return next(new AppError("No pubs found ", 404));
    }

    res.status(200).json({
      status: "success",
      data: pubs.length === 0 ? { message: "no pubs found" } : { pubs },
    });
  }
);
