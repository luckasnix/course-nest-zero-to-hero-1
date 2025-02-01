import { taskStatuses } from './tasks.constants';

export type TaskStatus = (typeof taskStatuses)[number];

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};
