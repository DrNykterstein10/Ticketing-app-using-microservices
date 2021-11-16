import express from "express";
import mongoose from "mongoose";
import "express-async-errors";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/currentUser";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(errorHandler);

const startApp = async () => {
  if (!process.env.JWT_SIGNING_KEY) {
    throw new Error("JWT key must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

startApp();
