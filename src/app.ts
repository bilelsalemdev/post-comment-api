import express from "express";
import globalErrorHandler from "./controllers/error.controller";

const app = express();

app.use(express.json());

app.use(globalErrorHandler);
export default app;
