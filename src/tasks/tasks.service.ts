import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Task } from './tasks.types';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  insert(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'OPEN',
    };
    this.tasks.push(task);
    return task;
  }

  findOne(taskId: string): Task | undefined {
    const task = this.tasks.find(({ id }) => id === taskId);
    if (!task) {
      throw new NotFoundException(`task with ID ${taskId} not found`);
    }
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  filterMany(filterTasksDto: FilterTasksDto): Task[] {
    const { searchTerm, taskStatus } = filterTasksDto;
    return this.tasks.filter(({ title, description, status }) => {
      const filteringResult = {
        searchTerm: true,
        taskStatus: true,
      };
      if (searchTerm) {
        filteringResult.searchTerm =
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (taskStatus) {
        filteringResult.taskStatus = status === taskStatus;
      }
      return Object.values(filteringResult).every(Boolean);
    });
  }

  updateOne(taskId: string, updateTaskDto: UpdateTaskDto): Task | undefined {
    const { taskStatus } = updateTaskDto;
    const task = this.findOne(taskId);
    if (task) {
      task.status = taskStatus;
    }
    return task;
  }

  deleteOne(taskId: string): void {
    const task = this.findOne(taskId);
    if (task) {
      this.tasks = this.tasks.filter(({ id }) => id !== task.id);
    }
  }
}
