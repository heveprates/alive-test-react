import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={9}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Paper>
              <Box p={2}>
                <Skeleton variant="rounded" height={240} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper>
              <Box p={2}>
                <Skeleton variant="rounded" height={240} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Box p={2}>
                <Skeleton variant="rounded" height={240} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper>
          <Box p={2}>
            <Skeleton variant="rounded" height={540} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
