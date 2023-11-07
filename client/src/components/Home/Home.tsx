import { Container } from '@mui/material';
import AppBar from '../AppBar/AppBar';
import History from '../History';

export default function Home() {
  return (
    <>
      <AppBar />
      <Container>
        <History />
      </Container>
    </>
  );
}
