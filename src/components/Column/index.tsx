import React from 'react';
import { ColumnType } from '../../utils/enums';
import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { TaskModel } from '../../utils/models';
import Task from '../Task';
import { useColumnTask } from '../../hooks/useColumnTask';
import { useColumnDrop } from '../../hooks/useColumnDrop';

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: 'gray',
  'In Progress': 'blue',
  'In Review': 'red',
  'Ready For Deployment': 'green',
};

const Column = ({ column }: { column: ColumnType }) => {
  const {
    tasks,
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
  } = useColumnTask(column);

  const { isOver, dropRef } = useColumnDrop(column, dropTaskFrom);

  const sortedColTask = tasks.sort((a, b) =>
    a?.priority.localeCompare(b?.priority)
  );

  const ColumnTasks = sortedColTask.map((task: TaskModel, idx: number) => (
    <Task
      key={task?.id}
      task={task}
      index={idx}
      onUpdate={updateTask}
      onDelete={deleteTask}
      onDropHover={swapTasks}
    />
  ));

  return (
    <Box>
      <Heading fontSize='md' mb={4} letterSpacing='wide'>
        <Badge
          px={2}
          py={1}
          rounded='lg'
          colorScheme={ColumnColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        size='xs'
        w='full'
        color={useColorModeValue('gray.500', 'gray.400')}
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
        py={2}
        aria-label='add-task'
        icon={<AddIcon />}
        colorScheme='black'
        variant='solid'
        onClick={addEmptyTask}
      />
      <Stack
        ref={dropRef}
        direction={['row', 'column']}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded='lg'
        boxShadow='md'
        overflow='auto'
        opacity={isOver ? 0.85 : 1}
      >
        {ColumnTasks}
      </Stack>
    </Box>
  );
};

export default Column;
