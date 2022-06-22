import express, { Application, Request, Response, NextFunction } from "express";

import Url from "../models/urlModel";

export const redirectToOriginal = async (req: Request, res: Response) => {
  //   res.redirect(`/localhost:3000/${req.params.show}`);

  console.log(
    req.params.shortUrl,
    "params.shortUrl",
    typeof req.params.shortUrl
  );

  const url = await Url.findOne({ short_url: { $eq: req.params.shortUrl } });

  console.log(url, "=========url");

  //   res.redirect("https://google.com");

  if (url && typeof url.long_url === "string") {
    console.log("redirect to " + url.long_url);
    res.redirect(`${url.long_url}`);
    // res.send(`${url.long_url}`);
    res.end();
  }
};
