import request from "supertest";
import { app } from "../../app";

it("returns 400 when a new email is entered", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("returns 400 when an incorrect password is entered", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "pass" })
    .expect(400);
});

it("sets a cookie header after successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
