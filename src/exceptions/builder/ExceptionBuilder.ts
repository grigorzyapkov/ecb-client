import { HttpStatus } from "../../constants/http-status.enum";
import { BadRequestException } from "../BadRequestException";
import { InternalServerErrorException } from "../InternalServerErrorException";
import { NotFoundException } from "../NotFoundException";

export class ExceptionBuilder {
  public static build(status: HttpStatus, message: string) {
    switch (status) {
      case HttpStatus.BAD_REQUEST: {
        return new BadRequestException(message);
      }
      case HttpStatus.NOT_FOUND:
        return new NotFoundException(message);
      default:
        return new InternalServerErrorException(message);
    }
  }
}
