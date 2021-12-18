import { Publisher, Subjects, TicketUpdatedEvent } from "@pr-ticketing-app/lib";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
