import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@pr-ticketing-app/lib";

import { Ticket } from "../models/ticket";
import { natsWrapper } from "../natsWrapper";
import { TicketCreatedPublisher } from "../events/publishers/ticketCreatedPublisher";

const Router = express.Router();

Router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const userId = req.currentUser!.id!;

    const ticket = Ticket.build({ title, price, userId });

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });

    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { Router as createTicketRouter };
