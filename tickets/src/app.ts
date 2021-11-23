import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import {
  NotFoundError,
  errorHandler,
  currentUser,
} from "@pr-ticketing-app/lib";
import { createTicketRouter } from "./routes/createTicket";
import { getTicketByIdRouter } from "./routes/getTicketById";
import { getTicketsRouter } from "./routes/getTickets";
import { updateTicketRouter } from "./routes/updateTicket";

const app = express();
app.set("trust proxy", true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(getTicketByIdRouter);
app.use(getTicketsRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
