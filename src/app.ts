import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
