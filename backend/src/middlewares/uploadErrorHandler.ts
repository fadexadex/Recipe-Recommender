//Handle upload errors
import {  Response, NextFunction } from "express";
import { AppError } from "./errorHandler";
import { RequestWithFile } from "index";

const uploadErrorHandler = (req: RequestWithFile, res: Response, next: NextFunction) => {
  if (req.fileValidationError) {
    next(new AppError(req.fileValidationError, 400));
  }
  next();
};

export default uploadErrorHandler;