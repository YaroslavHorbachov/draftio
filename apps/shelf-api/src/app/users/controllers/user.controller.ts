import { CreateUserModel } from '@draftio/shared/common';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() body: CreateUserModel) {
    return this.usersService.createOne(body);
  }

  @UseGuards(AuthGuard('firebase-jwt'))
  @Get()
  public getAll(@Request() req: any) {
    return req.user;
  }
}
