import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import urlsRouter from "./routes/urlRoutes";
import { errorHandler } from "./middleware/error";
import bodyparser from "body-parser";
import mongoose from "mongoose";
const cors = require("cors");
import { redirectToOriginal } from "./controllers/redirectController";

const app: Application = express();
app.use(cors());
app.use(bodyparser.json());
app.use(errorHandler);

app.use("/urls", urlsRouter);
app.get("/:shortUrl", redirectToOriginal);

mongoose.connect(`${process.env.MONGO_CONNECTION}`).then(() => {
  console.log("Connected to database");
  app.listen(process.env.PORT, (): void => {
    console.log("Server listening on port 3000");
  });
});
