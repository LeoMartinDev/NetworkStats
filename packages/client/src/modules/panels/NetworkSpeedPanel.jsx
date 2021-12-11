import { get, map, capitalize, compact, isEmpty } from 'lodash-es';
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { useNetworkSpeedPanelData } from "../../api";
import Panel from "./Panel";

function PeriodTypeToggleButton({ onChange, periodTypes, periodType }) {
  if (!periodTypes) {
    return null;
  }

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

function getDataset({ metricName, color, stats, metricsLabels }) {
  if (!stats?.[metricName]) {
    return;
  }

  return {
    label: metricsLabels?.[metricName],
    data: stats?.[metricName],
    fill: false,
    borderColor: color,
    tension: 0.1,
  };
};

export default function NetworkSpeedPanel() {
  const [state, setState] = useState({
    periodType: undefined,
    periodTypes: [],
    metricsLabels: undefined,
  });

  const {
    data,
    error,
    isLoading,
  } = useNetworkSpeedPanelData(state.periodType, {
    refreshInterval: 60 * 1000,
  });

  if (!isLoading) {
    if (isEmpty(state.periodTypes)) {
      setState((previousState) => ({
        ...previousState,
        periodTypes: get(data, 'periodTypes'),
      }));
    }

    if (state.periodType !== get(data, 'periodType')) {
      setState((previousState) => ({
        ...previousState,
        periodType: get(data, 'periodType'),
      }));
    }
  }

  const labels = get(data, 'periods');
  const stats = get(data, 'data');
  const metricsLabels = get(data, 'metricsLabels');
  const datasets = compact([
    getDataset({ metricName: 'download', color: '#4caf50', stats, metricsLabels }),
    getDataset({ metricName: 'upload', color: '#f50057', stats, metricsLabels }),
    getDataset({ metricName: 'ping', color: '#2196f3', stats, metricsLabels }),
  ]);

  const chartjsData = {
    labels,
    datasets,
  };

  const onPeriodTypeChange = (_event, newPeriodType) => {
    if (!newPeriodType) {
      return;
    }

    setState((previousState) => ({ ...previousState, periodType: newPeriodType }));
  };

  return (
    <Panel
      title="Speeds"
      header={
        <PeriodTypeToggleButton onChange={onPeriodTypeChange} periodType={state.periodType} periodTypes={state.periodTypes} />
      }
      isLoading={isLoading}
    >
      <Line data={chartjsData} />
    </Panel>
  );
}
