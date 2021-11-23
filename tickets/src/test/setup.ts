import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../app";

let mongo: any;

declare global {
  var signin: () => string[];
}

beforeAll(async () => {
  process.env.JWT_SIGNING_KEY = "randomString";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  const payload = {
    id: "ienoine74bdnkjn",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, process.env.JWT_SIGNING_KEY!);

  const session = { jwt: token };
  const sessionJson = JSON.stringify(session);

  const base64Session = Buffer.from(sessionJson).toString("base64");

  return [`express:sess=${base64Session}`];
};
