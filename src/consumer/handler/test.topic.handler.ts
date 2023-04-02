import { Injectable } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Injectable()
export class TestTopicHandlerService {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  caseHandler(message: any) {
    try {
      console.log(message);
      const type = message?.type;
      switch (type) {
        case 'NEW_USER':
          this.userService.saveNewUser(message);
          break;
        case 'SAVE_POST':
          this.postService.createNewPost(message);
          break;
        default:
          console.log('Unknown message type!');
      }
    } catch (error) {
      console.log('--- Invalid message type or case ---', error);
    }
  }
}
