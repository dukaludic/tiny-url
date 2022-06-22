import express, { Request, Response, NextFunction } from "express";
import { Url } from "../models/urlModel";

const checkIfUrlExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filter = { long_url: { $eq: req.body.long_url } };
  const url = await Url.findOne(filter);
  console.log(url, "exists");
  // if (url && url.counter !== undefined) {
  //   url.counter = url.counter + 1;
  //   url.save();
  //   res.send(url);
  // } else {
  //   next();
  // }
  next();
};

export { checkIfUrlExists };
