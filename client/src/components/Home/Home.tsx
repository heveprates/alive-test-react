import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '../AppBar';
import Dashboard from '../Dashboard/Dashboard';

export default function Home() {
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
            <Dashboard />
          </Box>
        </Container>
      </Box>
    </>
  );
}
