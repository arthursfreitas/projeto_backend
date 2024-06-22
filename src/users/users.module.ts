import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infra/database/database.module';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService],
  exports: [...userProviders, UsersService],
})
export class UsersModule {}
