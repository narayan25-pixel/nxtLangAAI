'use client';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { Provider } from "react-redux";
import { store } from './storage/store';

const theme = createTheme({
  palette: { mode: 'light' },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
    </Provider>
  );
}