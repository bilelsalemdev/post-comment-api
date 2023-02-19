import { Express, Request, Response } from "express";
import { createUserHandler, loginHandler } from "./controllers/user.controller";
import { protect, restrictTo } from "./controllers/auth.controller";
import validateResourse from "./middleware/validateResourse";
import { createUserSchema } from "./schema/user.schema";
import AppError from "./utils/appError";
import { createSessionSchema } from "./schema/session.schema";
import {
  createPubHandler,
  deletePubHandler,
  getAllPubsHandler,
} from "./controllers/pub.controller";
import { createPubSchema } from "./schema/pub.schema";
import { setPubUserId } from "./services/pub.service";

function routes(app: Express) {
  app.post(
    "/api/register",
    validateResourse(createUserSchema),
    createUserHandler
  );
  app.post("/api/login", validateResourse(createSessionSchema), loginHandler);
  app.get("/api/pubs", protect, getAllPubsHandler);
  app.post(
    "/api/pubs",
    validateResourse(createPubSchema),
    protect,
    setPubUserId,
    createPubHandler
  );
  app.patch("/api/pubs/:pubId");
  app.delete("/api/pubs/:pubId", protect, deletePubHandler);
  app.get("/api/users");
  app.get("/api/users/:userId");
  app.patch("/api/users/:userId");
  app.delete("/api/users/:userId");
  app.get("/api/comments");
  app.get("/api/comments/:commentId");
  app.patch("/api/comments/:commentId");
  app.delete("/api/comments/:commentId");
}

export default routes;
