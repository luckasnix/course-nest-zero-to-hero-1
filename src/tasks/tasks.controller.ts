import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './tasks.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @HttpCode(201)
  postOneHandler(@Body() createTaskDto: CreateTaskDto): Promise<string> {
    return this.tasksService.insert(createTaskDto);
  }

  @Get()
  @HttpCode(200)
  getManyHandler(
    @Query() filterTasksDto: FilterTasksDto,
  ): Promise<TaskEntity[]> {
    return this.tasksService.find(filterTasksDto);
  }

  @Get(':taskId')
  @HttpCode(200)
  getOneHandler(@Param('taskId') taskId: string): Promise<TaskEntity | null> {
    return this.tasksService.findOne(taskId);
  }

  @Patch(':taskId')
  @HttpCode(200)
  patchOneHandler(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<string> {
    return this.tasksService.updateOne(taskId, updateTaskDto);
  }

  @Delete(':taskId')
  @HttpCode(204)
  deleteOneHandler(@Param('taskId') taskId: string): Promise<string> {
    return this.tasksService.deleteOne(taskId);
  }
}
