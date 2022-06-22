import express, { Application, Request, Response, NextFunction } from "express";
import {
  getUrls,
  getSingleUrl,
  insertUrl,
  getDomainCounts,
} from "../controllers/urlController";
import { errorHandler } from "../middleware/error";
import { checkIfUrlExists } from "../middleware/checkIfUrlExists";

const router = express.Router();
// const logger = (req: Request, res: Response, next: NextFunction) => {
//   console.log("LOG");
//   next();
// };

router.get("/", getUrls);
router.post("/", insertUrl);
router.get("/counter", getDomainCounts);

export default router;
