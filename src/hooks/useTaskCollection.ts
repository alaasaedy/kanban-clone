import React from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';

export const useTaskCollection = () => {
  return useLocalStorage<{ [key in ColumnType]: TaskModel[] }>('tasks', {
    Todo: [
      {
        id: uuidv4(),
        priority: 'High',
        column: ColumnType.TO_DO,
        title: 'Task 1',
        desc: 'Consider a FancyButton component that renders the native button DOM element',
        color: 'blue.300',
        date: '2022/05/06',
      },
    ],
    'In Progress': [
      {
        id: uuidv4(),
        priority: 'Medium',
        column: ColumnType.TO_DO,
        title: 'Task 2',
        desc: 'Consider a FancyButton component that renders the native button DOM element',
        color: 'yellow.300',
        date: '2022/05/05',
      },
    ],
    'In Review': [
      {
        id: uuidv4(),
        priority: 'Low',
        column: ColumnType.TO_DO,
        title: 'Task 3',
        desc: 'Consider a FancyButton component that renders the native button DOM element',
        color: 'red.300',
        date: '2022/05/04',
      },
    ],
    'Ready For Deployment': [
      {
        id: uuidv4(),
        priority: 'Medium',
        column: ColumnType.TO_DO,
        title: 'Task 4',
        desc: 'Consider a FancyButton component that renders the native button DOM element',
        color: 'green.300',
        date: '2022/05/06',
      },
    ],
  });
};
