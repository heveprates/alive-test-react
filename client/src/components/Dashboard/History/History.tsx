import { Skeleton, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import CardInputHeader from '../CardInputHeader';
import HistoryLineChart from './HistoryLineChart.tsx';

export default function History() {
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
        <HistoryLineChart />
        {/* <Skeleton variant="rounded" height={208} /> */}
      </Stack>
    </>
  );
}
