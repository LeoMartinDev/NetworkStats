import * as React from 'react';

import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import PanelsPage from './pages/Panels';

export default function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PanelsPage stats={state.stats} units={state.units} />
    </ThemeProvider>
  );
}
