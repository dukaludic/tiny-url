import express, { Application, Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import { Url } from "../models/urlModel";
import { TypeUrl } from "../models/urlModel";

const insertUrl = async (req: Request, res: Response): Promise<void> => {
  let domain: URL;
  try {
    domain = new URL(req.body.long_url);
  } catch (error) {
    res.status(500).send(error);
  }

  // @ts-ignore
  if (!domain) {
    return;
  }

  try {
    let shortUrl = nanoid(7);

    let isReserved: object[] | null = await Url.find({
      short_url: { $eq: shortUrl },
    });

    console.log(isReserved, "isReserved");

    if (isReserved.length > 0) {
      shortUrl = nanoid(8);
      console.log(shortUrl, "shortUrl in If");
      isReserved = await Url.find({ short_url: { $eq: shortUrl } });
    }

    if (isReserved.length > 0) {
      res.status(500).send({ msg: "Please try again" });
      return;
    }

    const urlObject: object = {
      long_url: req.body.long_url,
      short_url: shortUrl,
      domain: domain.host,
    };

    const url: TypeUrl = await Url.create(urlObject);

    res.send(url);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Something went wrong" });
  }
};

const getDomainCounts = async (req: Request, res: Response): Promise<void> => {
  console.log(req.query);

  try {
    const urls: TypeUrl[] = await Url.find({
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    const domains: object[] = [];
    for (let i = 0; i < urls.length; i++) {
      if (!domains.some((obj: any) => obj.domain === urls[i].domain)) {
        domains.push({ domain: urls[i].domain, count: 1 });
      } else {
        const obj: any = domains.find(
          (obj: any) => obj.domain === urls[i].domain
        );

        obj.count = obj.count + 1;
      }
    }

    domains.sort((a: any, b: any) => {
      return b.count - a.count;
    });

    const limited = domains.slice(0, Number(req.query.limit));

    res.send(limited);
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong" });
  }
};

const getSingleUrl = async (req: Request, res: Response): Promise<void> => {
  console.log(req.params.id);
  const url = Url.findOne<TypeUrl>({ _id: req.params.id });
  res.send("getSingleUrl");
};

export { insertUrl, getSingleUrl, getDomainCounts };
