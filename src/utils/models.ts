import { ColumnType } from './enums';

export interface TaskModel {
  id: string;
  priority: string;
  title: string;
  desc: string;
  column: ColumnType;
  color: string;
  date: string;
}

export interface DrageItem {
  index: number;
  id: TaskModel['id'];
  from: ColumnType;
}
