import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("returns 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns the ticket if it is found", async () => {
  const title = "title";
  const price = 10;
  const userId = "testId";
  const ticket = Ticket.build({ title, price, userId });
  await ticket.save();

  const id = ticket.id;

  await request(app).get(`/api/tickets/${id}`).send().expect(200);
});
