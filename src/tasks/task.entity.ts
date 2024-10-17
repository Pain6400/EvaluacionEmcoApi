import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
