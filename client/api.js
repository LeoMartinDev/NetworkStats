import useSWR from "swr";

export {
  useNetworkSpeedPanelData,
};

const BASE_URL = 'http://localhost:3000/api';

const fetcher = async (url) => {
  const response = await fetch(`${BASE_URL}/${url}`);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')

    error.info = await response.json()
    error.status = response.status
    throw error
  }

  return response.json()
};

function useNetworkSpeedPanelData(options) {
  const { data, error } = useSWR(`panels/network-speed`, fetcher, options)

  return {
    data,
    error,
    isLoading: !error && !data,
  };
}
