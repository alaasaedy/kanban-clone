import React, { forwardRef } from 'react';
import { Textarea, TextareaProps, Heading, Badge } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';

interface AutoResizeTextAreaProps extends TextareaProps {
  badgecolor?: string;
  priority?: string;
  id?: string;
  modal: number;
}

const AutoResizeTextArea = forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextAreaProps
>((props: AutoResizeTextAreaProps, ref) => {
  const { badgecolor, priority, id, modal } = props;

  return (
    <>
      {modal && (
        <Heading as='h6' size='xs'>
          <Badge rounded='lg' mr={2} px={2} py={1} colorScheme={badgecolor}>
            {priority}
          </Badge>
          TRE-{id}
        </Heading>
      )}
      <Textarea mt={3} as={ResizeTextarea} minH='unset' ref={ref} {...props} />
    </>
  );
});

export default AutoResizeTextArea;
