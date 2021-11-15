import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError{
    statusCode = 500;
    error = 'Could not connect to database';

    constructor(){
        super('Error connecting to database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeError(){
        return [{message: this.error}];
    }
}