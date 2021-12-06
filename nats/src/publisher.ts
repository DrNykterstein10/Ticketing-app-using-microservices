import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedPublisher } from "./events/ticketCreatedPublisher";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("connected to NATS server");

  const publisher = new TicketCreatedPublisher(stan);

  await publisher.publish({
    id: "45hg",
    title: "title",
    price: 89,
    userId: "user1",
  });
});
