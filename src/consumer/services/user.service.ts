import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
interface UserPayload {
  username: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async saveNewUser(payload: any) {
    try {
      console.log('---- saving new user ----');
      console.log({ payload });
      const userObj = {};
      const results = await this.prisma.user.create({
        data: payload,
      });
      console.log({ results });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
