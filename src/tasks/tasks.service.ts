import { Injectable } from '@nestjs/common';
import type { Task, TaskStatus } from './tasks.types';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  insert(title: string, description: string): Task {
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
    return this.tasks.find(({ id }) => id === taskId);
  }

  findAll(): Task[] {
    return this.tasks;
  }

  filterMany(searchTerm?: string, taskStatus?: TaskStatus): Task[] {
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

  updateOne(taskId: string, status: TaskStatus): Task | undefined {
    const task = this.findOne(taskId);
    if (task) {
      task.status = status;
    }
    return task;
  }

  deleteOne(taskId: string): void {
    this.tasks = this.tasks.filter(({ id }) => id !== taskId);
  }
}
