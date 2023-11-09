import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import dayjs from 'dayjs';

import { useQuote } from '../../../stores/useQuote';
import { currencyFormatter } from '../../../tools/currencyFormatter';

export default function Quote() {
  const [isLoading, data, stock] = useQuote((state) => [
    state.isLoading,
    state.data,
    state.stock,
  ]);
  const display = {
    price: '',
    date: '',
  };
  if (data) {
    display.price = currencyFormatter(data.lastPrice);
    display.date = `preço em ${dayjs(data.pricedAt).format(
      'DD [de] MMMM [de] YYYY',
    )}`;
  }

  return (
    <>
      <Grid container spacing={0.5} height="100%" alignItems="center">
        <Grid item xs={12} md>
          <Typography
            variant="h1"
            component="h1"
            color={(theme) => theme.palette.primary.main}
          >
            {stock}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h3" component="h3">
            {isLoading ? (
              <Skeleton variant="rounded" height="1lh" width="7ch" />
            ) : (
              display.price
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
              display.date
            )}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
