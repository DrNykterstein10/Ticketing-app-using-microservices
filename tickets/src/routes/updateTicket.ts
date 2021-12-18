import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@pr-ticketing-app/lib";

import { Ticket } from "../models/ticket";
import { TicketUpdatedPublisher } from "../events/publishers/ticketUpdatedPublisher";
import { natsWrapper } from "../natsWrapper";

const Router = express.Router();

Router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const existingTicket = await Ticket.findById(req.params.id);

    if (!existingTicket) {
      throw new NotFoundError();
    }

    if (existingTicket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const { title, price } = req.body;

    existingTicket.set({
      title,
      price,
    });

    await existingTicket.save();

    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: existingTicket.id,
      title: existingTicket.title,
      price: existingTicket.price,
      userId: existingTicket.userId,
    });

    return res.send(existingTicket);
  }
);

export { Router as updateTicketRouter };
