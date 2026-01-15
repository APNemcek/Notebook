import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersSeed } from './users.seed';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersSeed],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly usersSeed: UsersSeed) {}

  async onModuleInit() {
    await this.usersSeed.seedAdmin();
  }
}
