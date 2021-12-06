import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import AvTimer from '@mui/icons-material/AvTimer';
import Upload from '@mui/icons-material/Upload';
import Download from '@mui/icons-material/Download';

import Panel from "./Panel";
import { Box } from '@mui/system';

const getMeanMetric = ({ last24HoursStats, metricName }) =>
  _.chain(last24HoursStats).meanBy(`metrics.${metricName}`).round(2).value() || undefined;

export default function NetworkSpeedsPanel({ stats, units }) {
  const last24HoursStats = _.filter(stats, ({ date }) =>
    dayjs(date).isAfter(dayjs().subtract(24, 'hours')));

  const meanPing = getMeanMetric({ last24HoursStats, metricName: 'ping' });
  const downloadPing = getMeanMetric({ last24HoursStats, metricName: 'download' });
  const uploadPing = getMeanMetric({ last24HoursStats, metricName: 'upload' });

  return (
    <Panel title="Last 24 hours averages">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'inline-flex' }}><AvTimer /><Typography>Ping: {meanPing} {units?.ping}</Typography></Box>
        <Box sx={{ display: 'inline-flex' }}><Download /><Typography>Download speed: {downloadPing} {units?.download}</Typography></Box>
        <Box sx={{ display: 'inline-flex' }}><Upload /><Typography>Upload speed: {uploadPing} {units?.upload}</Typography></Box>
      </Box>
    </Panel>
  );
}