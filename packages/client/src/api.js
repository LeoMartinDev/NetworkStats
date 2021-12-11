import { forEach, pickBy, identity } from "lodash-es";
import useSWR from "swr";

export {
  useNetworkSpeedPanelData,
};

const BASE_URL = 'http://localhost:3000/api';

const fetcher = async ({ path, queryparams }) => {
  const url = new URL(`${BASE_URL}${path}`);

  forEach(pickBy(queryparams, identity), (value, key) => url.searchParams.append(key, value));

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')

    error.info = await response.json()
    error.status = response.status
    throw error
  }

  await new Promise(resolve => setTimeout(resolve, 400));

  return response.json()
};

function useNetworkSpeedPanelData(periodType, options) {
  const { data, error } = useSWR({ path: '/panels/network-speed', queryparams: { periodType }, }, fetcher, options)

  return {
    data,
    error,
    isLoading: !error && !data,
  };
}
