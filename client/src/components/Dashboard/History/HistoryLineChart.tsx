import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

type MultiLineChartProps = {
  lowSeries: number[];
  highSeries: number[];
  openSeries: number[];
  closeSeries: number[];
  labels: Date[];
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format;

export default function HistoryLineChart(props: MultiLineChartProps) {
  const xLabels = props.labels.map((base) =>
    dayjs(base).format('D [de] MMMM [de] YYYY'),
  );
  const datamin = {
    data: props.lowSeries,
    label: 'Minima',
    valueFormatter: currencyFormatter,
  };

  const datamax = {
    data: props.highSeries,
    label: 'Maxima',
    valueFormatter: currencyFormatter,
  };

  const dataopen = {
    data: props.openSeries,
    label: 'Abertura',
    valueFormatter: currencyFormatter,
  };

  const dataclose = {
    data: props.closeSeries,
    label: 'Fechamento',
    valueFormatter: currencyFormatter,
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
