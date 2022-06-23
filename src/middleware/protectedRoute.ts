import express, { Request, Response, NextFunction } from "express";

export const protectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query.isAuthenticated === "false") {
    console.log("Unauthorized");
    res.status(401).send({ msg: "Unauthorized" });
    return;
  } else {
    next();
  }
};
