import * as React from 'react';

import { createTheme, CssBaseline, ThemeProvider, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import ChartsPage from './pages/Charts';
import { getStats } from './api';

export function App() {
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

  const [stats, setStats] = React.useState([]);

  React.useEffect(async () => {
    const response = await getStats();

    setStats(response);
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ChartsPage stats={stats} />
      </ThemeProvider>
    </React.StrictMode>
  );
}
