import { Line } from "react-chartjs-2";
import Panel from "./Panel";

export default function NetworkSpeedsPanel({ stats }) {
  const statsByDate = _.orderBy(stats, 'asc');
  const metricsNames = ['download', 'upload'];

  const dates = _.map(statsByDate, 'date');

  const download = {
    label: 'Download',
    data: _.map(statsByDate, 'metrics.download'),
    fill: false,
    borderColor: '#4caf50',
    tension: 0.1,
  };

  const upload = {
    label: 'Upload',
    data: _.map(statsByDate, 'metrics.upload'),
    fill: false,
    borderColor: '#f50057',
    tension: 0.1,
  };
  
  const data = {
    labels: dates,
    datasets: [
      download,
      upload,
    ],
  };

  return (
    <Panel title="Speeds">
      <Line
        data={data}
      />
    </Panel>
  );
}