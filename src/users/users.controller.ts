// src/users/users.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { username: string, password: string, roleId: number }) {
    const { username, password, roleId } = body;
    return this.usersService.createUser(username, password, roleId);
  }
}
