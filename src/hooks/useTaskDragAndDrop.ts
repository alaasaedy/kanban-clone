import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { ItemType } from '../utils/enums';
import { DrageItem, TaskModel } from '../utils/models';

export const useTaskDragAndDrop = <T extends HTMLElement>({
  task,
  index,
  handleDropHover,
}: {
  task: TaskModel;
  index: number;
  handleDropHover: (i: number, j: number) => void;
}) => {
  const ref = useRef<T>(null);
  const [{ isDragging }, drag] = useDrag<
    DrageItem,
    void,
    { isDragging: boolean }
  >({
    type: ItemType.TASK,
    item: { from: task.column, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<DrageItem, void, unknown>({
    accept: ItemType.TASK,
    hover: (item, monitor) => {
      if (!ref) return;

      const draggedItemIndex = item.index;
      const hoveredItemIndex = index;

      if (draggedItemIndex === hoveredItemIndex) return;

      const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex;
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

      const { x: mouseX, y: mouseY } = monitor.getClientOffset() as XYCoord;

      const hoverBoundingRect = ref.current?.getBoundingClientRect()!;
      const hoverMiddleHeight =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const mouseYRelativeToHovered = mouseY - hoverBoundingRect.top;
      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoverMiddleHeight;
      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoverMiddleHeight;

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) return;

      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) return;

      handleDropHover(draggedItemIndex, hoveredItemIndex);

      item.index = hoveredItemIndex;
    },
  });

  drag(drop(ref));

  return {
    ref,
    isDragging,
  };
};
