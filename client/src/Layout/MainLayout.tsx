import type { PropsWithChildren } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import AppBar from '../components/AppBar';

export default function MainLayout(props: PropsWithChildren) {
  return (
    <>
      <AppBar />
      <Box
        component="main"
        bgcolor={(theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[900]
        }
        overflow="auto"
        height="100vh"
      >
        <Container maxWidth="xl">
          <Box mt={2} mb={2}>
            {props.children}
          </Box>
        </Container>
      </Box>
    </>
  );
}
