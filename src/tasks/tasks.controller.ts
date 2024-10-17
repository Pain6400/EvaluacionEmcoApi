import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { RolesGuard } from '../auth/roles.guard';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(RolesGuard)
  @Post()
  create(@Body() taskData: any) {
    return this.taskService.create(taskData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('status') status: string) {
    return this.taskService.update(id, status);
  }

  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
