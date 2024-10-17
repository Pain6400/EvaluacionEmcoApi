import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.userService.createUser(userData.username, hashedPassword, userData.roleId);
  }

  @Post('login')
  async login(@Body() loginData: any) {
    const user = await this.authService.validateUser(loginData.username, loginData.password);
    if (user) {
      return this.authService.login(user);
    }
    return { message: 'Invalid credentials' };
  }
}
