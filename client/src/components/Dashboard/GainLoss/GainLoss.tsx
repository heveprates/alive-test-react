import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Grid, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import CardHeader from '../CardInputHeader';
import { useGainLoss } from '../../../stores/useGainLoss';
import { useFetchGainLoss } from '../../../services/fetchGainLoss';
import { EmptyGainLoss } from './EmptyGainLoss';
import { DisplayGain } from './DisplayGain';
import { DisplayInfo } from './DisplayInfo';

export default function GainLoss() {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [totalValue, setTotalValue] = useState<string>('');

  const [param, isLoading, data] = useGainLoss((state) => [
    state.param,
    state.isLoading,
    state.data,
  ]);
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
              <EmptyGainLoss />
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                <DisplayGain
                  isLoading={isLoading}
                  capitalGains={data?.capitalGains}
                />
              </Grid>
              <Grid item xs={12}>
                <DisplayInfo
                  isLoading={isLoading}
                  date={data?.date}
                  price={data?.priceAt}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Stack>
    </>
  );
}
