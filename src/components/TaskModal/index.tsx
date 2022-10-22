import React, { forwardRef, useEffect } from 'react';
import {
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Select,
  Grid,
} from '@chakra-ui/react';
import './styles.css';
import { TaskModel } from '../../utils/models';
import AutoResizeTextArea from '../AutoResizeTextArea';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  ref?: React.MutableRefObject<null>;
  badgeColor: string;
  task: TaskModel;
  taskId: string;
  onUpdate: (
    id: TaskModel['id'],
    updateTask: Omit<Partial<TaskModel>, 'id'>
  ) => void;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskModal = forwardRef(
  (
    {
      isOpen,
      onClose,
      task,
      taskId,
      onUpdate,
      badgeColor,
      setIsModal,
    }: TaskModalProps,
    ref
  ) => {
    const { title, priority, date, desc, id } = task;

    const handleDescriptionChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      onUpdate(id, { ...task, desc: e.target.value });
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onUpdate(id, { ...task, priority: e.target.value });
    };

    useEffect(() => {
      setIsModal(true);
    }, []);
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px={2} py={5} id='taskModal'>
          <ModalHeader>
            <Grid mt={5} templateColumns='repeat(2, 1fr)' gap={6}>
              <Heading as='h5' size='sm'>
                <Badge
                  px={2}
                  py={1}
                  mr={3}
                  rounded='lg'
                  colorScheme={badgeColor}
                >
                  {priority}
                </Badge>
                TRE-{taskId}
              </Heading>
              <Select
                onChange={handlePriorityChange}
                placeholder='Change Priority'
              >
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
              </Select>
            </Grid>
            <Heading mt={3} as='h2' size='md'>
              {title}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading as='h4' size='sm' mb={3}>
              Description
            </Heading>
            <AutoResizeTextArea
              value={desc?.toLowerCase()}
              cursor='inherit'
              border='none'
              p={0}
              resize='none'
              minH={70}
              maxH={100}
              focusBorderColor='none'
              onChange={handleDescriptionChange}
            />
            <Heading as='h4' size='sm' mt={4} mb={3}>
              Date
            </Heading>
            {date}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

export default TaskModal;
