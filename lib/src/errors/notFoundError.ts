import { CustomError } from "..";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Resource not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return [{ message: "Requested resource was not found" }];
  }
}
