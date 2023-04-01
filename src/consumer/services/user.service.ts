import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  async saveNewUser(payload: any) {
    try {
      console.log('---- saving new user ----');
      console.log({ payload });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
