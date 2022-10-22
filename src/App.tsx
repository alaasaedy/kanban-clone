import { useState } from 'react';
import { Heading, Container, SimpleGrid } from '@chakra-ui/react';
import Column from './components/Column';
import { ColumnType } from './utils/enums';

function App() {
  return (
    <>
      {/* <Heading
        fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
        fontWeight='bold'
        textAlign='center'
        mt={4}
      >
        Kanban Clone
      </Heading> */}
      <Container maxW='container.lg' mt={5} px={4} py={10}>
        <SimpleGrid minChildWidth='120px' spacing={{ base: 16, md: 4 }}>
          <Column column={ColumnType.TO_DO} />
          <Column column={ColumnType.IN_PROGRESS} />
          <Column column={ColumnType.IN_REVIEW} />
          <Column column={ColumnType.DEPLOYMENT_READY} />
        </SimpleGrid>
      </Container>
    </>
  );
}

export default App;
