import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async insert(createTaskDto: CreateTaskDto): Promise<string> {
    const { title, description } = createTaskDto;
    const result = await this.taskRepository.insert({
      title,
      description,
      status: 'OPEN',
    });
    return `taks with ID ${result.identifiers[0].id} created`;
  }

  async findOne(taskId: string): Promise<TaskEntity | null> {
    const task = await this.taskRepository.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException(`task with ID ${taskId} not found`);
    }
    return task;
  }

  async find(filterTasksDto: FilterTasksDto): Promise<TaskEntity[]> {
    const { searchTerm, taskStatus } = filterTasksDto;
    const query = this.taskRepository.createQueryBuilder('task');
    if (searchTerm) {
      query.andWhere(
        'task.title ILIKE :searchTerm OR task.description ILIKE :searchTerm',
        { searchTerm: `%${searchTerm}%` },
      );
    }
    if (taskStatus) {
      query.andWhere('task.status = :taskStatus', { taskStatus });
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async updateOne(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<string> {
    const { taskStatus } = updateTaskDto;
    const result = await this.taskRepository.update(
      { id: taskId },
      { status: taskStatus },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`task with ID ${taskId} not found`);
    }
    return `task with ID ${taskId} updated`;
  }

  async deleteOne(taskId: string): Promise<string> {
    const result = await this.taskRepository.delete({ id: taskId });
    if (result.affected === 0) {
      throw new NotFoundException(`task with ID ${taskId} not found`);
    }
    return `task with ID ${taskId} deleted`;
  }
}
