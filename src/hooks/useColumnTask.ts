import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';
import { useTaskCollection } from './useTaskCollection';
import { pickChakraRandomColor, swap, getDate } from '../utils/helpers';

const MAX_TASKS_PER_COL = 100;

export const useColumnTask = (column: ColumnType) => {
  const [tasks, setTasks] = useTaskCollection();

  const addEmptyTask = useCallback(() => {
    setTasks((_prevTasks) => {
      const columnTask = _prevTasks[column];

      if (columnTask.length > MAX_TASKS_PER_COL) return _prevTasks;
      const newColTask: TaskModel = {
        id: uuidv4(),
        priority: 'High',
        title: `New ${column} task`,
        color: pickChakraRandomColor('.300'),
        column,
        desc: "modal is a dialog that focuses the user's attention exclusively ",
        date: getDate(),
      };
      return { ..._prevTasks, [column]: [newColTask, ...columnTask] };
    });
  }, [column, setTasks]);

  const updateTask = useCallback(
    (id: TaskModel['id'], updateTask: Omit<Partial<TaskModel>, 'id'>) => {
      setTasks((_prevTasks) => {
        const columnTask = _prevTasks[column];
        return {
          ..._prevTasks,
          [column]: columnTask.map((task) => {
            if (task['id'] === id) {
              return { ...tasks, ...updateTask };
            }
            return task;
          }),
        };
      });
    },
    [column, setTasks]
  );

  const deleteTask = useCallback(
    (id: TaskModel['id']) => {
      setTasks((_prevTasks) => {
        const columnTask = _prevTasks[column];
        return {
          ..._prevTasks,
          [column]: columnTask.filter((task) => task['id'] !== id),
        };
      });
    },
    [column, setTasks]
  );

  const dropTaskFrom = useCallback(
    (from: ColumnType, id: TaskModel['id']) => {
      setTasks((_prevTask) => {
        const fromColumnTasks = _prevTask[from];
        const toColumnTasks = _prevTask[column];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        if (!movingTask) return _prevTask;

        return {
          ..._prevTask,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [{ ...movingTask, column }, ...toColumnTasks],
        };
      });
    },
    [column, setTasks]
  );

  const swapTasks = useCallback(
    (i: number, j: number) => {
      setTasks((_prevTasks) => {
        const columnTasks = _prevTasks[column];
        return {
          ..._prevTasks,
          [column]: swap(columnTasks, i, j),
        };
      });
    },
    [column, setTasks]
  );

  return {
    tasks: tasks[column],
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
  };
};
