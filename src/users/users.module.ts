// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // Asegúrate de importar el controlador
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Asegúrate de que esta sea la entidad correcta

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importa el repositorio
  controllers: [UsersController], // Registra el controlador
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
