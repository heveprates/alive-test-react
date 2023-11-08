import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

type MultiLineChartProps = {
  width?: number;
};

export default function HistoryLineChart() {
  const makeData = (qtd: number, max = 10, min = 0) =>
    [...new Array(qtd)].map(() => ((max - min) * Math.random() + min) >> 0);
  const makeDate = (base: Date, qtd: number) =>
    [...new Array(qtd)].map((_, i) =>
      dayjs(base).add(i, 'day').format('D [de] MMMM [de] YYYY'),
    );

  const xLabels = makeDate(dayjs().subtract(12, 'day').toDate(), 12);
  const datamin = {
    data: makeData(12, 110, 105),
    label: 'low',
  };
  const datamax = {
    data: makeData(12, 120, 115),
    label: 'high',
  };

  const dataopen = {
    data: makeData(12, 120, 105),
    label: 'open',
  };

  const dataclose = {
    data: makeData(12, 120, 105),
    label: 'close',
  };

  const bottomAxisId = 'bxid-' + Math.random().toString(36).slice(-4);

  return (
    <LineChart
      yAxis={[{ min: Math.min(...datamin.data) - 1 }]}
      xAxis={[{ id: bottomAxisId, scaleType: 'point', data: xLabels }]}
      series={[datamax, datamin, dataopen, dataclose]}
      slotProps={{
        legend: {
          padding: -4,
        },
      }}
      bottomAxis={{
        axisId: bottomAxisId,
        tickLabelStyle: {
          angle: 45,
          textAnchor: 'start',
          fontSize: 9,
        },
      }}
      height={400}
    />
  );
}
