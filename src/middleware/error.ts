import express, { Application, Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(err, "ERROR");
  res.status(statusCode);
  res.json({
    message: err.message,
  });
  next();
};

export { errorHandler };
