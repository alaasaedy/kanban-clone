import React, { useState, useRef } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  IconButton,
  Heading,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';
import { TaskModel } from '../../utils/models';
import AutoResizeTextArea from '../AutoResizeTextArea';
import { useTaskDragAndDrop } from '../../hooks/useTaskDragAndDrop';
import TaskModal from '../TaskModal';

type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (
    id: TaskModel['id'],
    updateTask: Omit<Partial<TaskModel>, 'id'>
  ) => void;
  onDelete: (id: TaskModel['id']) => void;
  onDropHover: (i: number, j: number) => void;
};

const Task = ({
  index,
  task,
  onUpdate,
  onDelete,
  onDropHover: handleDropHover,
}: TaskProps) => {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index,
    handleDropHover,
  });

  const finalRef = React.useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModal, setIsModal] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(task['id'], { ...task, title: e.target.value });
  };

  const priorityColor = (priority: string) => {
    const priorityStr = priority.toLowerCase();
    switch (priorityStr) {
      case 'high':
        return 'red';

      case 'medium':
        return 'orange';

      default:
        return 'green';
    }
  };

  let badgeColor = priorityColor(task.priority);

  const _id = task.id.split('').splice(0, 3).join('').toUpperCase();

  return (
    <Box
      ref={ref}
      as='div'
      role='group'
      position='relative'
      rounded='lg'
      minW={200}
      minH={100}
      maxH={200}
      pl={3}
      pr={7}
      pt={3}
      pb={1}
      cursor='grab'
      boxShadow='xl'
      bgColor={task.color}
      opacity={isDragging ? 0.5 : 1}
      onClick={onOpen}
    >
      <TaskModal
        isOpen={isOpen}
        onClose={onClose}
        ref={finalRef}
        badgeColor={badgeColor}
        task={task}
        taskId={_id}
        onUpdate={onUpdate}
        setIsModal={setIsModal}
      />
      <IconButton
        position='absolute'
        top={0}
        right={0}
        zIndex={100}
        aria-label='delete-task'
        size='md'
        colorScheme='solid'
        color='gray.700'
        icon={<DeleteIcon />}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        onClick={() => onDelete(task['id'])}
      />
      <AutoResizeTextArea
        value={task.title}
        fontWeight='semibold'
        cursor='inherit'
        border='none'
        p={0}
        resize='none'
        minH={70}
        maxH={200}
        focusBorderColor='none'
        color='gray.700'
        onChange={handleTitleChange}
        badgecolor={badgeColor}
        priority={task.priority}
        id={_id}
        modal={isModal ? 1 : 0}
      />

      {/* <Heading as='h6' size='xs'>
        <Badge rounded='lg' mr={2} px={2} py={1} colorScheme={badgeColor}>
          {task.priority}
        </Badge>
        TRE-{_id}
      </Heading>
      <Heading as='h5' size='sm' mt={4}>
        {task.title}
      </Heading> */}
    </Box>
  );
};

export default Task;
