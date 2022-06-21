import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import urlsRouter from "./routes/urlRoutes";
import viewsRouter from "./client/routes/viewRoutes";
import { errorHandler } from "./middleware/error";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import path from "path";

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
app.use(errorHandler);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./client/views"));

console.log(path.join(__dirname, "../views"));

// app.get("*", (req, res) => {
//   res.send("*");
// });

// app.get("/home", errorHandler, (req: Request, res: Response) => {
//   res.status(200).json({ message: "home" });
// });

app.get("/", (req, res) => {
  res.render("home", { text: "html" });
});

app.use("/urls", urlsRouter);
app.use("/views", viewsRouter);

app.listen(process.env.PORT, (): void => {
  console.log("Server listening on port 3000");
});
