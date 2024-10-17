import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['user'] });
  }

  findByUser(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { user: { id: userId } } });
  }

  create(taskData: any): Promise<Task[]> {
    const task = this.taskRepository.create(taskData);
    return this.taskRepository.save(task);
  }

  update(id: number, status: string): Promise<any> {
    return this.taskRepository.update(id, { status });
  }

  delete(id: number): Promise<any> {
    return this.taskRepository.delete(id);
  }
}
