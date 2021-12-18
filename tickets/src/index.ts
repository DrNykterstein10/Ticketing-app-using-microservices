import mongoose from "mongoose";

import { natsWrapper } from "./natsWrapper";
import { app } from "./app";

const startApp = async () => {
  if (!process.env.JWT_SIGNING_KEY) {
    throw new Error("JWT key must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("Mongo connection URI must be defined");
  }

  try {
    await natsWrapper.connect("ticketing", "random", "http://nats-srv:4222");

    natsWrapper.client.on("close", () => {
      console.log("Nats client connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongo");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

startApp();
