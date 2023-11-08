import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';

import Home from './components/Home';

const defaultTheme = createTheme();

function App() {
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
