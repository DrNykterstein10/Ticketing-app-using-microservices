import request from "supertest";
import { app } from "../../app";

it("returns details of current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("returns null if user is signed out", async () => {
  const response = await request(app)
    .get("/api/users/currentUser")
    .send()
    .expect(200);
  expect(response.body.currentUser).toBeNull();
});
