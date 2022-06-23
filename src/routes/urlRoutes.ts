import express, { Application, Request, Response, NextFunction } from "express";
import {
  getUrls,
  getSingleUrl,
  insertUrl,
  getDomainCounts,
} from "../controllers/urlController";
import { errorHandler } from "../middleware/error";
import { checkIfUrlExists } from "../middleware/checkIfUrlExists";
import { protectedRoute } from "../middleware/protectedRoute";

const router = express.Router();
// const logger = (req: Request, res: Response, next: NextFunction) => {
//   console.log("LOG");
//   next();
// };

router.get("/", errorHandler, getUrls);
router.post("/", insertUrl);
router.get("/counter", protectedRoute, getDomainCounts);

export default router;
