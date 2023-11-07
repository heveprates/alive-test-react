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
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Dashboard />
        </Container>
      </Box>
    </>
  );
}
