import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import "@shared/infra/typeorm";
import "@shared/container/index";
import configUpload from "@config/upload";
import AppError from "@shared/error/AppError";
import { errors } from "celebrate";
import rateLimiter from "./middlewares/ratelimiter";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(configUpload.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.warn(err);
  return res.status(500).json({
    status: "error",
    message: "Server error >> " + err.message,
  });
});

app.listen(3333, () => {
  console.log("Server runing on port 3333 🚀");
});
