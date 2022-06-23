import express, { Application, Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const statusCode = res.statusCode ? res.statusCode : 500;
  // console.log(err, "ERROR");
  // res.status(statusCode);
  // res.json({
  //   message: err.message,
  // });
  // next();

  console.log("error handler");

  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
};

export { errorHandler };
