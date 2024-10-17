import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { RolesGuard } from '../roles/roles.guard';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum'; 

@Controller('tasks')
@UseGuards(JwtAuthGuard) 
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('getAll')
  @Roles(Role.Admin)
  findAll() {
    return this.taskService.findAll();
  }

  @Post('create')
  @Roles(Role.Admin)
  create(@Body() taskData: any) {
    return this.taskService.createTask(taskData); 
  }

  @Put(':id')
  @Roles(Role.Admin, Role.User)
  update(@Param('id') id: number, @Body('status') status: string) {
    return this.taskService.update(id, status);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
