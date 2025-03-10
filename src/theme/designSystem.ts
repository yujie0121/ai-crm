import { alpha } from '@mui/material/styles';

// 设计系统 - 定义全局样式变量和组件样式
export const designSystem = {
  // 颜色系统
  colors: {
    // 主色调
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    // 辅助色
    secondary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      950: '#2e1065',
    },
    // 中性色
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    // 功能色
    success: {
      light: '#dcfce7',
      main: '#22c55e',
      dark: '#166534',
    },
    warning: {
      light: '#fef9c3',
      main: '#eab308',
      dark: '#854d0e',
    },
    error: {
      light: '#fee2e2',
      main: '#ef4444',
      dark: '#b91c1c',
    },
    info: {
      light: '#e0f2fe',
      main: '#0ea5e9',
      dark: '#0369a1',
    },
  },
  
  // 阴影
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  },
  
  // 圆角
  borderRadius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px',
  },
  
  // 间距
  spacing: {
    0: '0',
    0.5: '4px',
    1: '8px',
    1.5: '12px',
    2: '16px',
    2.5: '20px',
    3: '24px',
    3.5: '28px',
    4: '32px',
    5: '40px',
    6: '48px',
    7: '56px',
    8: '64px',
    9: '72px',
    10: '80px',
    12: '96px',
    16: '128px',
    20: '160px',
    24: '192px',
  },
  
  // 过渡
  transitions: {
    fast: 'all 0.1s ease-in-out',
    normal: 'all 0.2s ease-in-out',
    slow: 'all 0.3s ease-in-out',
    bounce: 'all 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  },
  
  // 字体
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
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    fontSizes: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      md: '1rem',        // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },
  
  // 组件样式变体
  components: {
    // 卡片变体
    card: {
      default: {
        borderRadius: '16px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        hover: {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      },
      flat: {
        borderRadius: '12px',
        boxShadow: 'none',
        border: '1px solid #e5e7eb',
      },
      elevated: {
        borderRadius: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: 'none',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        hover: {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    
    // 按钮变体
    button: {
      default: {
        borderRadius: '8px',
        padding: '8px 20px',
        fontWeight: 600,
        textTransform: 'none',
        transition: 'all 0.2s ease-in-out',
        hover: {
          transform: 'translateY(-1px)',
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        },
      },
      rounded: {
        borderRadius: '9999px',
        padding: '8px 24px',
      },
      soft: (color: string) => ({
        backgroundColor: alpha(color, 0.1),
        color: color,
        '&:hover': {
          backgroundColor: alpha(color, 0.2),
        },
      }),
    },
    
    // 表格样式
    table: {
      header: {
        backgroundColor: 'rgba(33, 150, 243, 0.04)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
      },
      row: {
        hover: {
          backgroundColor: '#f8fafc',
        },
        borderBottom: '1px solid #e5e7eb',
      },
    },
    
    // 表单元素
    input: {
      default: {
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        padding: '10px 14px',
        transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        focus: {
          borderColor: '#3b82f6',
          boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
        },
      },
    },
  },
  
  // 动画
  animations: {
    fadeIn: 'fade-in 0.3s ease-in-out',
    slideUp: 'slide-up 0.3s ease-in-out',
    slideDown: 'slide-down 0.3s ease-in-out',
    slideLeft: 'slide-left 0.3s ease-in-out',
    slideRight: 'slide-right 0.3s ease-in-out',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
  },
  
  // 响应式断点
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },
};