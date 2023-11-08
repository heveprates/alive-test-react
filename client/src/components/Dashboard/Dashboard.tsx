import { Grid, Paper, Box } from '@mui/material';

import Quote from './Quote';
import GainLoss from './GainLoss';
import Comparison from './Comparison';
import History from './History';

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={9}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={7}>
            <Paper>
              <Box p={2} height={240}>
                <Quote />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Paper>
              <Box p={2} height={240}>
                <GainLoss />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Box p={2}>
                <History />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper sx={{ height: '100%' }}>
          <Box p={2} height="100%">
            <Comparison />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
