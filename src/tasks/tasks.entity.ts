import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import type { TaskStatus } from './tasks.types';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
