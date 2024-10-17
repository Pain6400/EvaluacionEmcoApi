import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['user'] });
  }

  findByUser(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { user: { id: userId } } });
  }

  async createTask(taskData: any): Promise<Task> {
    // Busca el usuario relacionado con el ID proporcionado
    const user = await this.usersRepository.findOne({ where: { id: taskData.userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const task = this.taskRepository.create({
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || 'pending',
      dueDate: taskData.dueDate,
      user: user,  // Asigna el usuario a la tarea
    });

    return this.taskRepository.save(task);
  }

  update(id: number, status: string): Promise<any> {
    return this.taskRepository.update(id, { status });
  }

  delete(id: number): Promise<any> {
    return this.taskRepository.delete(id);
  }
}
