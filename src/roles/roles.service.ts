import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../users/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}


  createRole(name: string): Promise<any> {
    const role = this.rolesRepository.create({name: name});
    return this.rolesRepository.save(role);
  }
  // Otros métodos para obtener roles, actualizar, eliminar, etc.
}
