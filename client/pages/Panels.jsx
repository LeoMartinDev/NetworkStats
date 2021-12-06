import { Line } from 'react-chartjs-2';
import _ from 'lodash';

import { Container, Grid } from '@mui/material';
import NetworkSpeedPanel from '../modules/panels/NetworkSpeedPanel';
import DailyAveragePanel from '../modules/panels/DailyAveragePanel';

export default function PanelsPage({ stats, units }) {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <NetworkSpeedPanel />
        </Grid>
        <Grid item xs={4}>
          {/* <DailyAveragePanel stats={stats} units={units} /> */}
        </Grid>
      </Grid>
    </Container>
  );
}