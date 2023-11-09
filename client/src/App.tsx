import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import Home from './components/Home';
import { useQuote } from './stores/useQuote';
import { useGainLoss } from './stores/useGainLoss';
import { useComparison } from './stores/useComparison';

dayjs.locale('pt-br');
const defaultTheme = createTheme();

const clearStore = {
  handle: () => {},
};

function App() {
  const stock = useQuote((state) => state.stock);
  const clearGainLoss = useGainLoss((state) => state.clearGainLoss);
  const clearComparison = useComparison((state) => state.clearComparison);
  clearStore.handle = () => {
    clearGainLoss();
    clearComparison();
  };
  useEffect(() => {
    clearStore.handle();
  }, [stock]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <CssBaseline />
        <Home />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
