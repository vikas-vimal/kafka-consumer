import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Injectable()
export class TestTopicHandlerService {
  constructor(private userService: UserService) {}

  caseHandler(message: any) {
    try {
      console.log(message);
      const type = message?.type;
      switch (type) {
        case 'NEW_USER':
          this.userService.saveNewUser(message);
          break;
        default:
          throw new Error('Unknown message type!');
      }
    } catch (error) {
      console.log('--- Invalid message type or case ---', error);
    }
  }
}
