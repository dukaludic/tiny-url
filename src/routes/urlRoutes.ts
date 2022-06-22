import express, { Application, Request, Response, NextFunction } from "express";
import { getUrls, getSingleUrl, insertUrl } from "../controllers/urlController";
import { errorHandler } from "../middleware/error";
import { checkIfUrlExists } from "../middleware/checkIfUrlExists";

const router = express.Router();
// const logger = (req: Request, res: Response, next: NextFunction) => {
//   console.log("LOG");
//   next();
// };

router.get("/", getUrls);
// router.use(errorHandler);
router.post(
  "/",
  (req, res, next) => {
    console.log("router");
    next();
  },
  checkIfUrlExists,
  insertUrl
);

router.get("/:id", getSingleUrl);

export default router;
