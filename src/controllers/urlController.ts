import express, { Application, Request, Response, NextFunction } from "express";

import Url from "../models/urlModel";

// mozda koristiti asyncHandler iz expressa
const getUrls = async (req: Request, res: Response) => {
  try {
    const urls = await Url.find();
    res.send(urls);
  } catch (error) {
    console.log(error);
  }
};

const insertUrl = async (req: Request, res: Response) => {
  //   const base58Encode = (deci: number): string => {
  //     const chars: string =
  //       "123456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
  //     let hash: string = "";
  //     while (deci > 0) {
  //       hash = chars[2] + hash;
  //       deci /= 58;
  //     }
  //     return hash;
  //   };

  //   const encode = (input: any) => {
  //     const chars: string =
  //       "123456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
  //     if (input === 0) {
  //       return 0;
  //     }
  //     let s: any = [];
  //     while (input > 0) {
  //       s = [chars[input % 62], ...s];
  //       input = Math.floor(input / 62);
  //     }
  //     return s.join("");
  //   };

  //   console.log(encode(3213122));

  console.log("insertUrl");

  //   const hash = base58Encode(7);

  //   console.log(hash);
  try {
    //Create short_url
    //Counter
    // ili da ide redom pa overwrite ako je obrnuo krug ili da isticu. Ako isticu opet postoji da bude overwriten ukoliko je veliki saobracaj. Ili i jedno i drugo. Da isticu u zavisnosti od saobracaja.
    //Ako je counter onda bi trebalo da bude hexadecimal
    //Base62 encode
    //Without lower L and 0 and O and o

    //ovo ako samo 7 cifara ima traje kratko;
    //staviti da istice brzo ako je ovako

    // const counter = 1456723;
    const counter: any = await Url.count({});

    // TODO hexadecimal
    const createShortUrl = (counter: any): string => {
      const length = counter.toString().length;

      //znajuci length ispisi od kraja
      const startingIndex = 8 - length;
      const str: any = "0".repeat(startingIndex) + counter.toString();

      return str;
    };

    const shortUrl = `${createShortUrl(counter)}`;

    console.log(createShortUrl(14723), "createShortUrl");

    const url = await Url.create({
      long_url: req.body.long_url,
      short_url: shortUrl,
    });

    res.send(url);
    return;
  } catch (error) {
    console.log(error);
  }
};

const getSingleUrl = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const url = Url.findOne({ _id: req.params.id });
  //   console.log
  res.send("getSingleUrl");
};

export { getUrls, insertUrl, getSingleUrl };
