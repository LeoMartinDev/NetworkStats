import { Line } from 'react-chartjs-2';
import _ from 'lodash';

import { Container } from '@mui/material';
import NetworkSpeedChart from '../modules/panels/NetworkSpeedsPanel';

export default function PanelsPage({ stats }) {
  return (
    <Container>
      <NetworkSpeedChart stats={stats} />
    </Container>
  );
}