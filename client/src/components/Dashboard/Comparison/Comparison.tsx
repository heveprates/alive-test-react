import { useState } from 'react';
import { Box, Skeleton, Stack, TextField } from '@mui/material';

import CardInputHeader from '../CardInputHeader';

export default function Comparison() {
  const [tickerValue, setTickerlValue] = useState<string | null>(null);
  return (
    <>
      <Stack spacing={0.5} height="100%">
        <CardInputHeader title="Comparador">
          <Box width={220}>
            <TextField
              fullWidth
              label="Ticker"
              placeholder="Ticker do ativo"
              value={tickerValue}
              onChange={(el) => setTickerlValue(el.target.value.toUpperCase())}
            />
          </Box>
        </CardInputHeader>
        <Skeleton variant="rounded" height="100%" />
      </Stack>
    </>
  );
}
