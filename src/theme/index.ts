import { createTheme } from '@mui/material/styles';
import { zhCN } from '@mui/material/locale';
import { enhancedDesignSystem } from './enhancedDesignSystem';

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
    shape: {
      borderRadius: parseInt(enhancedDesignSystem.borderRadius.lg)
    },
    shadows: [
      'none',
      '0 2px 4px rgba(0,0,0,0.05)',
      '0 4px 8px rgba(0,0,0,0.1)',
      '0 8px 16px rgba(0,0,0,0.15)',
      '0 12px 24px rgba(0,0,0,0.2)',
      '0 16px 32px rgba(0,0,0,0.25)',
      '0 20px 40px rgba(0,0,0,0.3)',
      '0 24px 48px rgba(0,0,0,0.35)',
      '0 28px 56px rgba(0,0,0,0.4)',
      '0 32px 64px rgba(0,0,0,0.45)',
      '0 36px 72px rgba(0,0,0,0.5)',
      '0 40px 80px rgba(0,0,0,0.55)',
      '0 44px 88px rgba(0,0,0,0.6)',
      '0 48px 96px rgba(0,0,0,0.65)',
      '0 52px 104px rgba(0,0,0,0.7)',
      '0 56px 112px rgba(0,0,0,0.75)',
      '0 60px 120px rgba(0,0,0,0.8)',
      '0 64px 128px rgba(0,0,0,0.85)',
      '0 68px 136px rgba(0,0,0,0.9)',
      '0 72px 144px rgba(0,0,0,0.95)',
      '0 76px 152px rgba(0,0,0,1)',
      '0 80px 160px rgba(0,0,0,1)',
      '0 84px 168px rgba(0,0,0,1)',
      '0 88px 176px rgba(0,0,0,1)',
      '0 92px 184px rgba(0,0,0,1)'
    ],
    palette: {
      primary: {
        main: enhancedDesignSystem.colors.primary.main,
        light: enhancedDesignSystem.colors.primary.light,
        dark: enhancedDesignSystem.colors.primary.dark,
        contrastText: enhancedDesignSystem.colors.primary.contrastText
      },
      secondary: {
        main: enhancedDesignSystem.colors.secondary.main,
        light: enhancedDesignSystem.colors.secondary.light,
        dark: enhancedDesignSystem.colors.secondary.dark,
        contrastText: enhancedDesignSystem.colors.secondary.contrastText
      },
      neutral: {
        main: enhancedDesignSystem.colors.neutral.main,
        light: enhancedDesignSystem.colors.neutral.light,
        dark: enhancedDesignSystem.colors.neutral.dark,
        contrastText: enhancedDesignSystem.colors.neutral.contrastText
      },
      success: {
        main: enhancedDesignSystem.colors.success.main,
        light: enhancedDesignSystem.colors.success.light,
        dark: enhancedDesignSystem.colors.success.dark,
        contrastText: enhancedDesignSystem.colors.success.contrastText
      },
      warning: {
        main: enhancedDesignSystem.colors.warning.main,
        light: enhancedDesignSystem.colors.warning.light,
        dark: enhancedDesignSystem.colors.warning.dark,
        contrastText: enhancedDesignSystem.colors.warning.contrastText
      },
      error: {
        main: enhancedDesignSystem.colors.error.main,
        light: enhancedDesignSystem.colors.error.light,
        dark: enhancedDesignSystem.colors.error.dark,
        contrastText: enhancedDesignSystem.colors.error.contrastText
      },
      info: {
        main: enhancedDesignSystem.colors.info.main,
        light: enhancedDesignSystem.colors.info.light,
        dark: enhancedDesignSystem.colors.info.dark,
        contrastText: enhancedDesignSystem.colors.info.contrastText
      },
      background: {
        default: enhancedDesignSystem.colors.background.default,
        paper: enhancedDesignSystem.colors.background.paper
      },
      text: {
        primary: enhancedDesignSystem.colors.text.primary,
        secondary: enhancedDesignSystem.colors.text.secondary,
        disabled: enhancedDesignSystem.colors.text.disabled
      }
    },
    typography: {
      fontFamily: enhancedDesignSystem.typography.fontFamily,
      h1: enhancedDesignSystem.typography.h1,
      h2: enhancedDesignSystem.typography.h2,
      h3: enhancedDesignSystem.typography.h3,
      h4: enhancedDesignSystem.typography.h4,
      h5: enhancedDesignSystem.typography.h5,
      h6: enhancedDesignSystem.typography.h6,
      body1: enhancedDesignSystem.typography.body1,
      body2: enhancedDesignSystem.typography.body2,
      subtitle1: enhancedDesignSystem.typography.subtitle1,
      subtitle2: enhancedDesignSystem.typography.subtitle2,
      caption: enhancedDesignSystem.typography.caption,
      overline: {
        ...enhancedDesignSystem.typography.overline,
        textTransform: 'uppercase' as const
      },
      button: {
        ...enhancedDesignSystem.typography.button,
        textTransform: 'none' as const
      }
    },
    components: {
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
              boxShadow: '0 2px 4px 0 rgb(0 0 0 / 0.05)'
            }
          },
          contained: {
            boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            '&:hover': {
              boxShadow: '0 2px 4px 0 rgb(0 0 0 / 0.1)'
            }
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#ffffff',
            color: '#111827',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
          }
        }
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
                  color: '#2563eb'
                },
                '& .MuiListItemText-primary': {
                  color: '#2563eb',
                  fontWeight: 600
                }
              },
              '&:hover': {
                backgroundColor: '#f8fafc'
              }
            }
          }
        }
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
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }
          }
        }
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: '24px 32px'
          }
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '32px',
            '&:last-child': {
              paddingBottom: '32px'
            }
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-root': {
              backgroundColor: '#f8fafc',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              padding: '16px 24px',
              borderBottom: '2px solid rgba(33, 150, 243, 0.12)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: '#f1f5f9'
              }
            }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '16px 24px'
          }
        }
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            '&:hover': {
              visibility: 'visible'
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            '&.MuiChip-colorSuccess': {
              backgroundColor: '#dcfce7',
              color: '#166534'
            },
            '&.MuiChip-colorError': {
              backgroundColor: '#fee2e2',
              color: '#991b1b'
            },
            '&.MuiChip-colorWarning': {
              backgroundColor: '#ffedd5',
              color: '#92400e'
            },
            '&.MuiChip-colorPrimary': {
              backgroundColor: '#dbeafe',
              color: '#1d4ed8'
            }
          }
        }
      }
    }
  },
  zhCN
);

export default theme;