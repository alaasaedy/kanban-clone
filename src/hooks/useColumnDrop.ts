import { useDrop } from 'react-dnd';
import { ColumnType, ItemType } from '../utils/enums';
import { DrageItem, TaskModel } from '../utils/models';

export const useColumnDrop = (
  column: ColumnType,
  handleDrop: (fromColumn: ColumnType, taskId: TaskModel['id']) => void
) => {
  const [{ isOver }, dropRef] = useDrop<DrageItem, void, { isOver: boolean }>({
    accept: ItemType.TASK,
    drop: (dragItem) => {
      console.log({ dragItem, column });

      if (!dragItem || dragItem.from === column) return;
      if (
        column.toLowerCase() === 'ready for deployment' &&
        dragItem.from.toLowerCase() !== 'in review'
      )
        return;
      handleDrop(dragItem.from, dragItem.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return { isOver, dropRef };
};
