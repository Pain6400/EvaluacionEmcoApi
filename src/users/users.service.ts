// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string, roleId: number): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);  // Encriptar la contraseña
    const newUser = this.usersRepository.create({ username, password: hashedPassword, role: { id: roleId } });
    return this.usersRepository.save(newUser);
  }

  // Método para buscar un usuario por su nombre de usuario
  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username }, relations: ['role'] });
  }

  // Otros métodos como findById, etc.
}
