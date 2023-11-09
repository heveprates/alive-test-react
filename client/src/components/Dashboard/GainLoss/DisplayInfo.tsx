import { Box, Skeleton, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { currencyFormatter } from '../../../tools/currencyFormatter';

export function DisplayInfo({
  isLoading,
  date,
  price,
}: {
  isLoading: boolean;
  date?: Date;
  price?: number;
}) {
  const displayData = {
    date: '',
    price: '',
  };
  if (date !== undefined) {
    displayData.date = dayjs(date).format('[preço em] DD/MM/YYYY');
  }
  if (price !== undefined) {
    displayData.price = `era de ${currencyFormatter(price)}`;
  }
  return (
    <Typography
      variant="subtitle2"
      color={(theme) => theme.palette.text.secondary}
      textAlign="center"
    >
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <Skeleton variant="rounded" height="1lh" width="19ch" />
        </Box>
      ) : (
        displayData.date
      )}
      {}
      {isLoading ? (
        <Box display="flex" mt={0.5} justifyContent="center">
          <Skeleton variant="rounded" height="1lh" width="16ch" />
        </Box>
      ) : (
        <>
          <br />
          {displayData.price}
        </>
      )}
    </Typography>
  );
}
