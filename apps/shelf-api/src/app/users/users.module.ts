import { SharedAuthApiModule } from '@draftio/shared/auth-api';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/user.controller';
import { User } from './entities';
import { UsersService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedAuthApiModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
