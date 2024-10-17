// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './tasks.service';
import { Task } from './task.entity'; // Importa la entidad Task
import { TaskController } from './tasks.controller';
import { UsersModule } from '../users/users.module';  
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Registra la entidad Task
    UsersModule ,
    AuthModule 
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],  // Exporta si es necesario en otros módulos
})
export class TasksModule {}
