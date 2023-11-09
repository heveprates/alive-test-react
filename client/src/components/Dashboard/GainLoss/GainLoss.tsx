import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  Grid,
  Skeleton,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import CardHeader from '../CardInputHeader';
import { useGainLoss } from '../../../stores/useGainLoss';
import { useFetchGainLoss } from '../../../services/fetchGainLoss';
import { currencyFormatter } from '../../../tools/currencyFormatter';

export default function GainLoss() {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [totalValue, setTotalValue] = useState<string>('');

  const { param, isLoading, data } = useGainLoss();
  const fetchGainLoss = useFetchGainLoss();

  const isEmptyState = param === null;

  useEffect(() => {
    if (isEmptyState) {
      setDateValue(null);
      setTotalValue('');
    }
  }, [isEmptyState]);

  const cardInputOkHandler = () => {
    if (dateValue === null || totalValue === '') {
      return;
    }
    fetchGainLoss(dateValue.toDate(), Number(totalValue));
  };

  const cardInputCancelHandler = () => {
    if (isEmptyState) {
      setDateValue(null);
      setTotalValue('');
      return;
    }
    setDateValue(dayjs(param.date));
    setTotalValue(String(param.amount));
  };

  const DisplayGain = () => {
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center">
          <Skeleton variant="rounded" height="1lh" width="7ch" />
        </Box>
      );
    }
    if (data === null) {
      return;
    }
    const isGain = data.capitalGains > 0;
    const isLoss = data.capitalGains < 0;
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
        {currencyFormatter(data.capitalGains)}
      </Typography>
    );
  };
  const displayData = {
    date: '',
    price: '',
  };
  if (data !== null) {
    displayData.date = dayjs(data.date).format('[preço em] DD/MM/YYYY');
    displayData.price = `era de ${currencyFormatter(data.priceAt)}`;
  }

  return (
    <>
      <Stack spacing={0.5} height="100%">
        <CardHeader
          title="Simulador"
          onCancel={cardInputCancelHandler}
          onOk={cardInputOkHandler}
        >
          <Stack spacing={2} width={200}>
            <TextField
              fullWidth
              label="Total"
              type="number"
              value={totalValue}
              onChange={(el) => setTotalValue(el.target.value)}
            />
            <DatePicker
              disableFuture
              slotProps={{
                field: { clearable: true },
              }}
              label="Data"
              value={dateValue}
              onChange={setDateValue}
            />
          </Stack>
        </CardHeader>
        <Grid container spacing={1} flexGrow={1} alignContent="center">
          {isEmptyState ? (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                color={(theme) => theme.palette.text.secondary}
                textAlign="center"
              >
                Veja o seu ganho baseado
                <br />
                em uma simulação de compra
              </Typography>
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <DisplayGain />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </>
          )}
        </Grid>
      </Stack>
    </>
  );
}
