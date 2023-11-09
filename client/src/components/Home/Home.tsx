import { Box, Typography } from '@mui/material';

import MainLayout from '../../Layout/MainLayout';
import { useQuote } from '../../stores/useQuote';
import Dashboard from '../Dashboard';

export default function Home() {
  const stock = useQuote((state) => state.stock);
  const hasStock = stock !== null;
  return (
    <>
      <MainLayout>
        {hasStock ? (
          <Dashboard />
        ) : (
          <Box mt={8} textAlign="center">
            <Typography variant="h3" component="h1">
              Busque por conhecimento
            </Typography>
            <Typography variant="h5">ET Bilu</Typography>
          </Box>
        )}
      </MainLayout>
    </>
  );
}
