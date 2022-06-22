import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import urlsRouter from "./routes/urlRoutes";
import viewsRouter from "./client/routes/viewRoutes";
import { errorHandler } from "./middleware/error";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import path from "path";
const cors = require("cors");
import { redirectToOriginal } from "./controllers/appController";

// Connect database
(async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_CONNECTION}`
    );

    // console.log(connection);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
})();

const app: Application = express();
app.use(cors());
app.use(bodyparser.json());

app.use("/urls", urlsRouter);
app.use("/views", viewsRouter);

app.get("/redirect/:shortUrl", redirectToOriginal);

app.listen(process.env.PORT, (): void => {
  console.log("Server listening on port 3000");
});
