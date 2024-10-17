import { Controller, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
constructor(
    private roleService: RolesService,
  ) {}

  @Post('register')
  async register(@Body() roleData: { name: string }) {
    return this.roleService.createRole(roleData.name);
  }
}