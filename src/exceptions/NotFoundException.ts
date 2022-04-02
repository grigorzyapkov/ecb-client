import { HttpStatus } from '../constants/http-status.enum';
import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
  constructor(message = 'Not Found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
