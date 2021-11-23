import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

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
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  const token = jwt.sign(payload, process.env.JWT_SIGNING_KEY!);

  const session = { jwt: token };
  const sessionJson = JSON.stringify(session);

  const base64Session = Buffer.from(sessionJson).toString("base64");

  return [`express:sess=${base64Session}`];
};
