// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Asegúrate de importar UsersModule
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Importa el UsersModule aquí
    JwtModule.register({
      // Configuración del módulo JWT
      secret: 'HondurasConEmco', // Cambia esto a tu clave secreta
      signOptions: { expiresIn: '3600s' }, // Cambia esto según tus necesidades
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, AuthService], 
  controllers: [AuthController],
})
export class AuthModule {}
