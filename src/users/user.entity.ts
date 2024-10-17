// src/users/user.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Role } from './role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })  // Nombre de la columna FK
  role: Role;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
