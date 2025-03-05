import { createTheme } from '@mui/material/styles';
import { zhCN } from '@mui/material/locale';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#2563eb',
        light: '#60a5fa',
        dark: '#1d4ed8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#4f46e5',
        light: '#818cf8',
        dark: '#4338ca',
        contrastText: '#ffffff',
      },
      neutral: {
        main: '#6b7280',
        light: '#9ca3af',
        dark: '#4b5563',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
            color: '#111827',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#ffffff',
            borderRight: '1px solid #e5e7eb',
            '& .MuiListItem-root': {
              borderRadius: 8,
              margin: '4px 8px',
              '&.Mui-selected': {
                backgroundColor: '#eff6ff',
                '& .MuiListItemIcon-root': {
                  color: '#2563eb',
                },
                '& .MuiListItemText-primary': {
                  color: '#2563eb',
                  fontWeight: 600,
                },
              },
              '&:hover': {
                backgroundColor: '#f8fafc',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            borderRadius: 16,
            border: '1px solid #e5e7eb',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            },
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: '24px 32px',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '32px',
            '&:last-child': {
              paddingBottom: '32px',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none',
            borderRadius: 8,
            padding: '8px 20px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 4px 0 rgb(0 0 0 / 0.05)',
            },
          },
          contained: {
            boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            '&:hover': {
              boxShadow: '0 2px 4px 0 rgb(0 0 0 / 0.1)',
            },
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(33, 150, 243, 0.04)',
            '& .MuiTableCell-root': {
              color: '#1a1f2c',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              padding: '16px 24px',
              borderBottom: '2px solid rgba(33, 150, 243, 0.12)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)'
              }
            }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 24px',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#f8fafc',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: 6,
            '&.MuiChip-colorSuccess': {
              backgroundColor: '#dcfce7',
              color: '#166534',
            },
            '&.MuiChip-colorError': {
              backgroundColor: '#fee2e2',
              color: '#991b1b',
            },
            '&.MuiChip-colorWarning': {
              backgroundColor: '#fef3c7',
              color: '#92400e',
            },
            '&.MuiChip-colorPrimary': {
              backgroundColor: '#eff6ff',
              color: '#1d4ed8',
            },
          },
        },
      },
    },
  },
  zhCN,
);

export default theme;