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
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Task } from './tasks.types';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @HttpCode(201)
  postOneHandler(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.insert(createTaskDto);
  }

  @Get()
  @HttpCode(200)
  getManyHandler(@Query() filterTasksDto: FilterTasksDto): Task[] {
    if (Object.keys(filterTasksDto).length) {
      return this.tasksService.filterMany(filterTasksDto);
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
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task | undefined {
    return this.tasksService.updateOne(taskId, updateTaskDto);
  }

  @Delete(':taskId')
  @HttpCode(204)
  deleteOneHandler(@Param('taskId') taskId: string): void {
    this.tasksService.deleteOne(taskId);
  }
}
