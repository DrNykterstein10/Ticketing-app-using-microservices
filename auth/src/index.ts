import mongoose from "mongoose";

import { app } from "./app";

const startApp = async () => {
  if (!process.env.JWT_SIGNING_KEY) {
    throw new Error("JWT key must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("Mongo connection URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

startApp();
