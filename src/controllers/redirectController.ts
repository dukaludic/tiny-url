import express, { Application, Request, Response, NextFunction } from "express";

import { Url } from "../models/urlModel";
import { TypeUrl } from "../models/urlModel";

export const redirectToOriginal = async (req: Request, res: Response) => {
  const url: TypeUrl | null = await Url.findOne({
    short_url: { $eq: req.params.shortUrl },
  });

  if (url && typeof url.long_url === "string") {
    console.log("redirect to " + url.long_url);
    res.redirect(`${url.long_url}`);
    res.end();
  } else {
    res.status(404).send({ msg: "URL not found" });
  }
};
