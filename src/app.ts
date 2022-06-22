import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import urlsRouter from "./routes/urlRoutes";
import { errorHandler } from "./middleware/error";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import path from "path";
const cors = require("cors");
import { redirectToOriginal } from "./controllers/redirectController";

// Connect database
(async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_CONNECTION}`
    );

    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    // os.exit(1);
  }
})();

const app: Application = express();
app.use(cors());
app.use(bodyparser.json());

app.use("/urls", urlsRouter);

//sredi ovo da bude na root endpoint
app.get("/:shortUrl", redirectToOriginal);

// mongoose.connect(`${process.env.MONGO_CONNECTION}`).then(() => {
//   app.listen(process.env.PORT, (): void => {
//     console.log("Server listening on port 3000");
//   });
// });

app.listen(process.env.PORT, (): void => {
  console.log("Server listening on port 3000");
});
