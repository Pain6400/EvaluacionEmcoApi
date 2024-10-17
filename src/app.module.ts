import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { Role } from './users/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { RolesController } from './roles/roles.controller';

@Module({
  imports: [
    // Cargar variables de entorno desde un archivo .env si es necesario
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible globalmente
    }),

    // Configuración de la base de datos con TypeORM y conexión a MySQL
    TypeOrmModule.forRoot({
      type: 'mysql', // Tipo de base de datos
      host: process.env.DB_HOST || 'localhost', // Servidor de base de datos
      port: parseInt(process.env.DB_PORT, 10) || 3306, // Puerto de MySQL
      username: process.env.DB_USERNAME || 'root', // Usuario de la base de datos
      password: process.env.DB_PASSWORD || '', // Contraseña
      database: process.env.DB_NAME || 'task_management', // Nombre de la base de datos
      entities: [User, Task, Role], // Entidades a cargar
      synchronize: true, // Sincronizar las entidades con la base de datos (solo en desarrollo)
    }),

    // Módulos de autenticación y gestión de usuarios y tareas
    AuthModule,
    UsersModule,
    TasksModule,

    // Configuración de JWT y autenticación
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Clave secreta para firmar el JWT
      signOptions: { expiresIn: '1h' }, // Expiración del token
    }),
  ],
  providers: [JwtStrategy],
  controllers: [RolesController], // Estrategia para autenticar con JWT
})
export class AppModule {}
