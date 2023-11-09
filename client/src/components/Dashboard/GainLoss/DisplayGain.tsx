import { Box, Skeleton, Typography } from '@mui/material';

import { currencyFormatter } from '../../../tools/currencyFormatter';

export function DisplayGain({
  isLoading,
  capitalGains,
}: {
  isLoading: boolean;
  capitalGains?: number;
}) {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <Skeleton variant="rounded" height="1lh" width="7ch" />
      </Box>
    );
  }
  if (capitalGains === undefined) {
    return;
  }
  const isGain = capitalGains > 0;
  const isLoss = capitalGains < 0;

  return (
    <Typography
      variant="h4"
      color={(theme) =>
        isGain
          ? theme.palette.success.light
          : isLoss
          ? theme.palette.error.light
          : theme.palette.text.primary
      }
      textAlign="center"
    >
      {isGain ? '+' : isLoss ? '-' : ''}{' '}
      {currencyFormatter(Math.abs(capitalGains))}
    </Typography>
  );
}
