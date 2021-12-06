// import get from 'lodash/get';
// import capitalize from 'lodash/capitalize';
// import map from 'lodash/map';
// import { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import { ToggleButton, ToggleButtonGroup } from '@mui/material';

// import { useNetworkSpeedPanelData } from "../../api";
// import Panel from "./Panel";

// export default function NetworkSpeedPanelContainer() {
//   const {
//     data,
//     error,
//     isLoading,
//   } = useNetworkSpeedPanelData();

//   return <NetworkSpeedPanel isLoading={isLoading} data={data} error={error} fetchData={fetchData} />;
// }

// function PeriodTypeToggleButton({ onChange, periodTypes, periodType }) {
//   const formatPeriodType = ({ periodType }) => capitalize(periodType);

//   return (
//     <ToggleButtonGroup
//       sx={{ flex: '1' }}
//       size="small"
//       value={periodType}
//       exclusive
//       onChange={onChange}
//     >
//       {map(periodTypes, (periodType) => <ToggleButton key={periodType} value={periodType}>{formatPeriodType({ periodType })}</ToggleButton>)}
//     </ToggleButtonGroup>
//   );
// }

// function NetworkSpeedPanel({ isLoading, data, fetchData }) {
//   const [state, setState] = useState({
//     labels: undefined,
//     stats: undefined,
//     metricsLabels: undefined,
//     periodTypes: undefined,
//     periodType: undefined,
//     chartjsData: undefined,
//   });

//   const getDataset = ({ metricName, color, stats, metricsLabels }) => ({
//     label: metricsLabels?.[metricName],
//     data: stats?.[metricName],
//     fill: false,
//     borderColor: color,
//     tension: 0.1,
//   });

//   useEffect(() => {
//     if (!data) {
//       return;
//     }

//     const labels = get(data, 'periods');
//     const stats = get(data, 'data');
//     const metricsLabels = get(data, 'metricsLabels');

//     setState({
//       labels,
//       stats,
//       metricsLabels,
//       periodTypes: get(data, 'periodTypes'),
//       periodType: get(data, 'periodType'),
//       chartjsData: {
//         labels,
//         datasets: [
//           getDataset({ metricName: 'download', color: '#4caf50', stats, metricsLabels }),
//           getDataset({ metricName: 'upload', color: '#f50057', stats, metricsLabels }),
//           getDataset({ metricName: 'ping', color: '#2196f3', stats, metricsLabels }),
//         ],
//       },
//     });
//   }, [isLoading]);

//   const onPeriodTypeChange = (_event, newPeriodType) => {
//     setState((prevState) => ({ ...prevState, periodType: newPeriodType }));

//     fetchData({ periodType: newPeriodType });
//   };

//   return (
//     <Panel
//       title="Speeds"
//       isLoading={isLoading}
//       header={
//         <PeriodTypeToggleButton onChange={onPeriodTypeChange} periodType={state.periodType} periodTypes={state.periodTypes} />
//       }
//     >
//       {state.chartjsData ? <Line data={state.chartjsData} /> : null}
//     </Panel>
//   );
// }

import get from 'lodash/get';
import capitalize from 'lodash/capitalize';
import map from 'lodash/map';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { useNetworkSpeedPanelData } from "../../api";
import Panel from "./Panel";

function PeriodTypeToggleButton({ onChange, periodTypes, periodType }) {
  const formatPeriodType = ({ periodType }) => capitalize(periodType);

  return (
    <ToggleButtonGroup
      sx={{ flex: '1' }}
      size="small"
      value={periodType}
      exclusive
      onChange={onChange}
    >
      {map(periodTypes, (periodType) => <ToggleButton key={periodType} value={periodType}>{formatPeriodType({ periodType })}</ToggleButton>)}
    </ToggleButtonGroup>
  );
}

export default function NetworkSpeedPanel() {
  const {
    data,
    error,
    isLoading,
  } = useNetworkSpeedPanelData({
    refreshInterval: 60 * 1000,
  });

  const getDataset = ({ metricName, color, stats, metricsLabels }) => ({
    label: metricsLabels?.[metricName],
    data: stats?.[metricName],
    fill: false,
    borderColor: color,
    tension: 0.1,
  });

  const labels = get(data, 'periods');
  const stats = get(data, 'data');
  const metricsLabels = get(data, 'metricsLabels');
  const periodTypes = get(data, 'periodTypes');
  const [periodType, setPeriodType] = useState(get(data, 'periodType'));
  const chartjsData = {
    labels,
    datasets: [
      getDataset({ metricName: 'download', color: '#4caf50', stats, metricsLabels }),
      getDataset({ metricName: 'upload', color: '#f50057', stats, metricsLabels }),
      getDataset({ metricName: 'ping', color: '#2196f3', stats, metricsLabels }),
    ],
  };

  const onPeriodTypeChange = (_event, newPeriodType) => {
    setPeriodType(newPeriodType);
  };

  if (isLoading) {
    return (
      <Panel
        title="Speeds"
        isLoading={isLoading}
      />
    );
  }

  return (
    <Panel
      title="Speeds"
      isLoading={isLoading}
      header={
        <PeriodTypeToggleButton onChange={onPeriodTypeChange} periodType={periodType} periodTypes={periodTypes} />
      }
    >
      <Line data={chartjsData} />
    </Panel>
  );
}
