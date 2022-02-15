import { HttpStatus } from "../../constants/http-status.enum";
import { BadRequestException } from "../BadRequestException";
import { InternalServerErrorException } from "../InternalServerErrorException";

export class ExceptionBuilder {
  public static build(status: HttpStatus, message: string) {
    switch(status) {
      case HttpStatus.BAD_REQUEST: {
        return new BadRequestException(message);
      }
      default:
        return new InternalServerErrorException(message);
    }
  }
}