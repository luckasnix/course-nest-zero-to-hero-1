import { IsIn } from 'class-validator';

import { taskStatuses } from '../tasks.constants';
import { TaskStatus } from '../tasks.types';

export class UpdateTaskDto {
  @IsIn(taskStatuses)
  taskStatus: TaskStatus;
}
