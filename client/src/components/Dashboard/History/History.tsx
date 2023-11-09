import { useEffect, useState } from 'react';
import { Skeleton, Stack, Typography } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import type { DateRange } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import CardInputHeader from '../CardInputHeader';
import HistoryLineChart from './HistoryLineChart.tsx';
import { useHistory } from '../../../stores/useHistory.ts';
import { useFetchHistory } from '../../../services/fetchHistory.ts';

export default function History() {
  const { isLoading, param, data } = useHistory();
  const fetchHistory = useFetchHistory();
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([
    dayjs().subtract(15, 'day'),
    dayjs().subtract(1, 'day'),
  ]);

  const isEmptyState = param === null;

  useEffect(() => {
    if (isEmptyState) {
      setDateRange([dayjs().subtract(15, 'day'), dayjs().subtract(1, 'day')]);
    }
  }, [isEmptyState]);

  const cardInputOkHandler = () => {
    if (dateRange[0] === null || dateRange[1] === null) {
      return;
    }
    fetchHistory(dateRange[0].toDate(), dateRange[1].toDate());
  };
  const cardInputCancelHandler = () => {
    if (isEmptyState) {
      setDateRange([dayjs().subtract(15, 'day'), dayjs().subtract(1, 'day')]);
      return;
    }
    setDateRange([dayjs(param.from), dayjs(param.to)]);
  };

  const dataSeries = {
    labels: [new Date()],
    low: [0],
    high: [0],
    open: [0],
    close: [0],
  };
  if (data) {
    dataSeries.labels = data.prices.map((item) => item.date);
    dataSeries.low = data.prices.map((item) => item.low);
    dataSeries.high = data.prices.map((item) => item.high);
    dataSeries.open = data.prices.map((item) => item.opening);
    dataSeries.close = data.prices.map((item) => item.closing);
  }

  return (
    <>
      <Stack spacing={0.5} height="100%">
        <CardInputHeader
          title="Historico"
          onCancel={cardInputCancelHandler}
          onOk={cardInputOkHandler}
        >
          <DateRangePicker
            localeText={{ start: 'Inicio', end: 'Fim' }}
            disableFuture
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
          />
        </CardInputHeader>
        {isEmptyState ? (
          <Typography
            variant="h6"
            color={(theme) => theme.palette.text.secondary}
            textAlign="center"
          >
            Veja o historico de valores
          </Typography>
        ) : isLoading ? (
          <Skeleton variant="rounded" height={400} />
        ) : (
          <HistoryLineChart
            labels={dataSeries.labels}
            lowSeries={dataSeries.low}
            highSeries={dataSeries.high}
            openSeries={dataSeries.open}
            closeSeries={dataSeries.close}
          />
        )}
      </Stack>
    </>
  );
}
