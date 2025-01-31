import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task, TaskStatus } from './tasks.types';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @HttpCode(201)
  postOneHandler(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.insert(title, description);
  }

  @Get()
  @HttpCode(200)
  getManyHandler(
    @Query('search-term') searchTerm: string,
    @Query('task-status') taskStatus: TaskStatus,
  ): Task[] {
    if (searchTerm || taskStatus) {
      return this.tasksService.filterMany(searchTerm, taskStatus);
    }
    return this.tasksService.findAll();
  }

  @Get(':taskId')
  @HttpCode(200)
  getOneHandler(@Param('taskId') taskId: string): Task | undefined {
    return this.tasksService.findOne(taskId);
  }

  @Patch(':taskId')
  @HttpCode(200)
  patchOneHandler(
    @Param('taskId') taskId: string,
    @Body('status') status: TaskStatus,
  ): Task | undefined {
    return this.tasksService.updateOne(taskId, status);
  }

  @Delete(':taskId')
  @HttpCode(204)
  deleteOneHandler(@Param('taskId') taskId: string): void {
    this.tasksService.deleteOne(taskId);
  }
}
