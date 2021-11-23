import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const Router = express.Router();

Router.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  return res.send(tickets);
});

export { Router as getTicketsRouter };
