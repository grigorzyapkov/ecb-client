import { HttpStatus } from '../constants/http-status.enum';
import { BaseException } from './BaseException';

export class InternalServerErrorException extends BaseException {
  constructor(message = 'Internal Server Error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
