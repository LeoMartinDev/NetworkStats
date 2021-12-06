import * as React from 'react';

import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import PanelsPage from './pages/Panels';

export function App() {
  let timeoutId;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const [state, setState] = React.useState({
    stats: [],
    units: {},
  });

  // const fetchStats = async () => {
  //   const { stats, units } = await getStats();

  //   setState((prevState) => ({
  //     ...prevState,
  //     stats,
  //     units,
  //   }));
  // };

  // const pollStats = async () => {
  //   await fetchStats();

  //   timeoutId = setTimeout(async () => {
  //     pollStats();
  //   }, 120000);
  // };

  // React.useEffect(async () => {
  //   // pollStats();

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PanelsPage stats={state.stats} units={state.units} />
      </ThemeProvider>
    </React.StrictMode>
  );
}
