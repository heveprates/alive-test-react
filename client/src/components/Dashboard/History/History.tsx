import { Skeleton, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';

import CardInputHeader from '../CardInputHeader';
import HistoryLineChart from './HistoryLineChart.tsx';

export default function History() {
  const makeData = (qtd: number, max = 10, min = 0) =>
    [...new Array(qtd)].map(() => ((max - min) * Math.random() + min) >> 0);
  const makeDate = (base: Date, qtd: number) =>
    [...new Array(qtd)].map((_, i) => dayjs(base).add(i, 'day').toDate());

  return (
    <>
      <Stack spacing={0.5} height="100%">
        <CardInputHeader title="Historico">
          <DateRangePicker
            localeText={{ start: 'Inicio', end: 'Fim' }}
            disableFuture
            currentMonthCalendarPosition={2}
          />
        </CardInputHeader>
        <HistoryLineChart
          labels={makeDate(dayjs().subtract(12, 'day').toDate(), 12)}
          lowSeries={makeData(12, 110, 105)}
          highSeries={makeData(12, 130, 125)}
          openSeries={makeData(12, 125, 110)}
          closeSeries={makeData(12, 125, 110)}
        />
        {/* <Skeleton variant="rounded" height={208} /> */}
      </Stack>
    </>
  );
}
