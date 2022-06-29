import express, { Application, Request, Response, NextFunction } from "express";
import {
  getSingleUrl,
  insertUrl,
  getDomainCounts,
} from "../controllers/urlController";
import { errorHandler } from "../middleware/error";
import { protectedRoute } from "../middleware/protectedRoute";

const router = express.Router();

router.post("/", insertUrl);
router.get("/counter", protectedRoute, getDomainCounts);

export default router;
