import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class UsersSeed {
  constructor(private readonly usersService: UsersService) {}

  async seedAdmin() {
    const exists = await this.usersService.findUsername('admin');
    if (!exists) {
      await this.usersService.create({
        username: 'admin',
        password: 'admin',
      });
    }
  }
}
