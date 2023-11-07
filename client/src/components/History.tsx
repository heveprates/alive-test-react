import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';

const opening = {
  data: [2, 3, 1, 4, 5, 6, 7, 8, 9, 10],
  label: 'Opening',
};
const low = {
  data: [3, 1, 4, 2, 1, 5, 6, 7, 8, 9],
  label: 'Low',
};
const high = {
  data: [3, 2, 4, 5, 1, 6, 7, 8, 9, 10],
  label: 'High',
};
const closing = {
  data: [9, 4, 2, 3, 1, 5, 6, 7, 8, 10],
  label: 'Closing',
};
const volume = {
  data: [1, 3, 3, 4, 8, 5, 6, 7, 8, 9],
  label: 'Volume',
};
// const sample = [1, 10, 30, 50, 70, 90, 100];

export default function History() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <Card sx={{ maxWidth: 630 }}>
      <CardContent>
        <Grid container>
          <Grid xs>
            <Typography gutterBottom variant="h5" component="div">
              History
            </Typography>
          </Grid>
          <Grid xs>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  label="Uncontrolled picker"
                  defaultValue={dayjs('2022-04-17')}
                />
                <DatePicker
                  label="Controlled picker"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <BarChart
          width={600}
          height={300}
          xAxis={[
            {
              scaleType: 'band',
              data: [
                '06/11/2023',
                '03/11/2023',
                '02/11/2023',
                '01/11/2023',
                '31/10/2023',
                '30/10/2023',
                '27/10/2023',
                '26/10/2023',
                '25/10/2023',
                '24/10/2023',
              ],
            },
          ]}
          series={[
            { ...opening, stack: 'total' },
            { ...low, stack: 'total' },
            { ...high, stack: 'total' },
            { ...closing, stack: 'total' },
            { ...volume, stack: 'total' },
          ]}
        />
      </CardContent>
    </Card>
  );
}
