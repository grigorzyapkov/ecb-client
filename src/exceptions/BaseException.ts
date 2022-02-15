import { HttpStatus } from '../constants/http-status.enum';

export class BaseException extends Error {
  private status: HttpStatus;
  constructor(message: string, status: HttpStatus) {
    // 'Error' breaks prototype chain here
    super(message);
    // restore prototype chain here
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = status;
  }

  public getMessage(): string {
    return this.message;
  }

  public getStatus(): HttpStatus {
    return this.status;
  }
}
