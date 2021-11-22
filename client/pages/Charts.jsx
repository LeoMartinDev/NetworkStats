import { Line } from 'react-chartjs-2';
import _ from 'lodash';

export default function ChartsPage({ stats }) {
  const statsByDate = _.orderBy(stats, 'asc');
  const statsKeys = _.keys(_.first(statsByDate));
  const metricsNames = _.without(statsKeys, 'id', 'date', 'ping');

  const dates = _.map(statsByDate, 'date');
  const metrics = _.map(metricsNames, (metricName) => ({
    label: metricName,
    data: _.map(statsByDate, metricName),
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }));

  const data = {
    labels: dates,
    datasets: metrics,
  };

  return (
    <Line
      data={data}
    />
  );
}