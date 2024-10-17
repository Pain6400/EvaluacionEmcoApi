// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './tasks.service';
import { Task } from './task.entity'; // Importa la entidad Task
import { TaskController } from './tasks.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),  // Registra la entidad Task
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],  // Exporta si es necesario en otros módulos
})
export class TasksModule {}
