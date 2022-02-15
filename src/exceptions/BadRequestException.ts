import { HttpStatus } from '../constants/http-status.enum';
import { BaseException } from './BaseException';

export class BadRequestException extends BaseException {
  constructor(message = 'Bad Request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
