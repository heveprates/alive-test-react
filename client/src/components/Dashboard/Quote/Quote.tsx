import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function Quote() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2456);
  });
  return (
    <>
      <Grid container spacing={0.5} height="100%" alignItems="center">
        <Grid item xs={12} md>
          <Typography
            variant="h1"
            component="h1"
            color={(theme) => theme.palette.primary.main}
          >
            APPL
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h3" component="h3">
            {isLoading ? (
              <Skeleton variant="rounded" height="1lh" width="7ch" />
            ) : (
              'R$ 149,00'
            )}
          </Typography>
          <Typography
            variant="subtitle2"
            color={(theme) => theme.palette.text.secondary}
            mt={1}
          >
            {isLoading ? (
              <Skeleton variant="rounded" height="1lh" width="31ch" />
            ) : (
              'preço em 10 de dezembro de 2021'
            )}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
