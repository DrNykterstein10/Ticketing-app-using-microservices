import { Publisher, Subjects, TicketCreatedEvent } from "@pr-ticketing-app/lib";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
