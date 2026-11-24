import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF7A3D', contrastText: '#1A0E06' },
    secondary: { main: '#C8F25A', contrastText: '#131411' },
    background: { default: '#131411', paper: '#20211D' },
    text: { primary: '#F3F1EA', secondary: '#A3A197' },
    divider: '#3A3B35',
  },
  typography: {
    fontFamily: 'var(--font-body)',
    body1: {
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--text-body--line-height)',
    },
    body2: {
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--text-body--line-height)',
    },
  },
});
