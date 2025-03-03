import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

import { taskStatuses } from '../tasks.constants';
import { TaskStatus } from '../tasks.types';

export class FilterTasksDto {
  @IsOptional()
  @IsNotEmpty()
  searchTerm?: string;

  @IsOptional()
  @IsIn(taskStatuses)
  taskStatus?: TaskStatus;
}
