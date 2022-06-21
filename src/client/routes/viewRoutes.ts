import express, { Application, Request, Response, NextFunction } from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { text: "URL" });
});

router.get("/popular", (req, res) => {
  res.send("HTML");
});

export default router;
