import { useState } from 'react';
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

export default function GainLoss() {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const cardInputOkHandler = () => {
    setIsLoading(true);
  };
  const cardInputCancelHandler = () => {
    setIsLoading(false);
  };

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
              onChange={(el) => setTotalValue(Number(el.target.value))}
            />
            <DatePicker
              disableFuture
              label="Data"
              value={dateValue}
              onChange={setDateValue}
            />
          </Stack>
        </CardHeader>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              color={(theme) => theme.palette.success.light}
              textAlign="center"
            >
              {isLoading ? (
                <Box display="flex" justifyContent="center">
                  <Skeleton variant="rounded" height="1lh" width="7ch" />
                </Box>
              ) : (
                '+ R$ 149,00'
              )}
            </Typography>
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
                <>preço em 10/12/2020</>
              )}
              {}
              {isLoading ? (
                <Box display="flex" mt={0.5} justifyContent="center">
                  <Skeleton variant="rounded" height="1lh" width="16ch" />
                </Box>
              ) : (
                <>
                  <br />
                  era de R$ 149,00
                </>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Stack>
    </>
  );
}
