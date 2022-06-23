import express, { Application, Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import { Url } from "../models/urlModel";
import { TypeUrl } from "../models/urlModel";

// mozda koristiti asyncHandler iz expressa
const getUrls = async (req: Request, res: Response): Promise<void> => {
  try {
    const urls = await Url.find();
    res.send(urls);
  } catch (error) {
    console.log(error);
  }
};

const insertUrl = async (req: Request, res: Response): Promise<void> => {
  let domain = new URL(req.body.long_url);

  console.log(domain.host, "domain");

  try {
    // const counter: any = await Url.count({});

    let shortUrl = nanoid(7);
    // let shortUrl = "Vl0RIyjx";

    let isReserved: object | null = await Url.find({
      short_url: { $eq: shortUrl },
    });

    console.log(isReserved, "isReserved");

    if (isReserved) {
      shortUrl = nanoid(8);
      console.log(shortUrl, "shortUrl in If");
      isReserved = await Url.find({ short_url: { $eq: shortUrl } });
    }

    if (isReserved) {
      shortUrl = nanoid(9);
      console.log(shortUrl, "shortUrl in If");
      isReserved = await Url.find({ short_url: { $eq: shortUrl } });
    }

    if (isReserved) {
      // res.status(500).send({ msg: "Please try again" });
    }

    const url = await Url.create({
      long_url: req.body.long_url,
      short_url: shortUrl,
      domain: domain.host,
    });

    res.send(url);
    return;
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong" });
  }
};

const getDomainCounts = async (req: Request, res: Response): Promise<void> => {
  console.log(req.query);

  try {
    const urls = await Url.find();

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

    console.log(domains);

    domains.slice(0, Number(req.query.limit));

    res.send(domains);
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong" });
  }
};

const getSingleUrl = async (req: Request, res: Response): Promise<void> => {
  console.log(req.params.id);
  const url = Url.findOne({ _id: req.params.id });
  //   console.log
  res.send("getSingleUrl");
};

export { getUrls, insertUrl, getSingleUrl, getDomainCounts };
