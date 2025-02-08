import { taskStatuses } from './tasks.constants';

export type TaskStatus = (typeof taskStatuses)[number];
