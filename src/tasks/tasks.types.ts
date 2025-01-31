export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};
