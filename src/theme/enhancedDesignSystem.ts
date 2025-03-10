// 增强版设计系统 - 定义全局样式变量和组件样式
export const enhancedDesignSystem = {
  // 颜色系统 - 扩展色彩范围和应用场景
  colors: {
    // 主色调 - 蓝色系
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
      950: '#072a60',
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#0d47a1',
      contrastText: '#ffffff',
    },
    // 辅助色 - 紫色系
    secondary: {
      50: '#f3e5f5',
      100: '#e1bee7',
      200: '#ce93d8',
      300: '#ba68c8',
      400: '#ab47bc',
      500: '#9c27b0',
      600: '#8e24aa',
      700: '#7b1fa2',
      800: '#6a1b9a',
      900: '#4a148c',
      950: '#2e0d57',
      main: '#7b1fa2',
      light: '#ba68c8',
      dark: '#4a148c',
      contrastText: '#ffffff',
    },
    // 中性色
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      950: '#121212',
      main: '#757575',
      light: '#bdbdbd',
      dark: '#424242',
      contrastText: '#ffffff',
    },
    // 功能色 - 扩展更多应用场景
    success: {
      light: '#a5d6a7',
      main: '#4caf50',
      dark: '#2e7d32',
      contrastText: '#ffffff',
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#4caf50',
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20',
      950: '#0d3c10',
    },
    warning: {
      light: '#ffcc80',
      main: '#ff9800',
      dark: '#ef6c00',
      contrastText: '#ffffff',
      50: '#fff3e0',
      100: '#ffe0b2',
      200: '#ffcc80',
      300: '#ffb74d',
      400: '#ffa726',
      500: '#ff9800',
      600: '#fb8c00',
      700: '#f57c00',
      800: '#ef6c00',
      900: '#e65100',
      950: '#bf4800',
    },
    error: {
      light: '#ef9a9a',
      main: '#f44336',
      dark: '#c62828',
      contrastText: '#ffffff',
      50: '#ffebee',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#f44336',
      600: '#e53935',
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c',
      950: '#891515',
    },
    info: {
      light: '#81d4fa',
      main: '#03a9f4',
      dark: '#0288d1',
      contrastText: '#ffffff',
      50: '#e1f5fe',
      100: '#b3e5fc',
      200: '#81d4fa',
      300: '#4fc3f7',
      400: '#29b6f6',
      500: '#03a9f4',
      600: '#039be5',
      700: '#0288d1',
      800: '#0277bd',
      900: '#01579b',
      950: '#013b68',
    },
    // 背景色
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
      card: '#ffffff',
      dialog: '#ffffff',
      drawer: '#ffffff',
      tooltip: '#616161',
      // 特殊背景
      highlight: '#fff8e1',
      selected: '#e3f2fd',
      hover: '#f5f5f5',
      disabled: '#f5f5f5',
    },
    // 文本色
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#9e9e9e',
      hint: '#9e9e9e',
      white: '#ffffff',
      dark: '#212121',
    },
    // 边框色
    border: {
      light: '#e0e0e0',
      main: '#bdbdbd',
      dark: '#9e9e9e',
      divider: 'rgba(0, 0, 0, 0.12)',
    },
    // 图表色板 - 用于数据可视化
    chart: {
      primary: ['#1976d2', '#42a5f5', '#90caf9', '#bbdefb', '#e3f2fd'],
      secondary: ['#7b1fa2', '#ba68c8', '#ce93d8', '#e1bee7', '#f3e5f5'],
      success: ['#2e7d32', '#66bb6a', '#a5d6a7', '#c8e6c9', '#e8f5e9'],
      warning: ['#ef6c00', '#ffa726', '#ffb74d', '#ffcc80', '#ffe0b2'],
      error: ['#c62828', '#ef5350', '#e57373', '#ef9a9a', '#ffcdd2'],
      info: ['#0288d1', '#29b6f6', '#4fc3f7', '#81d4fa', '#b3e5fc'],
      categorical: [
        '#1976d2', '#7b1fa2', '#2e7d32', '#ef6c00', '#c62828', '#0288d1',
        '#00796b', '#ff5722', '#5d4037', '#546e7a', '#6200ea', '#00b8d4'
      ],
      sequential: [
        '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1'
      ],
    },
  },
  
  // 排版系统 - 定义字体、大小、行高等
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
    // 标题
    h1: {
      fontSize: '2.5rem',  // 40px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      marginBottom: '0.5em',
    },
    h2: {
      fontSize: '2rem',    // 32px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      marginBottom: '0.5em',
    },
    h3: {
      fontSize: '1.75rem', // 28px
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      marginBottom: '0.5em',
    },
    h4: {
      fontSize: '1.5rem',  // 24px
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      marginBottom: '0.5em',
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.4,
      marginBottom: '0.5em',
    },
    h6: {
      fontSize: '1rem',    // 16px
      fontWeight: 600,
      lineHeight: 1.4,
      marginBottom: '0.5em',
    },
    // 正文
    body1: {
      fontSize: '1rem',    // 16px
      lineHeight: 1.5,
      marginBottom: '1em',
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.5,
      marginBottom: '1em',
    },
    // 其他
    subtitle1: {
      fontSize: '1rem',    // 16px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    caption: {
      fontSize: '0.75rem', // 12px
      lineHeight: 1.5,
      letterSpacing: '0.02em',
    },
    overline: {
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    button: {
      fontSize: '0.875rem', // 14px
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  
  // 阴影系统 - 定义不同层级的阴影效果
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    // 特定组件阴影
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
    dropdown: '0 4px 12px rgba(0, 0, 0, 0.15)',
    dialog: '0 8px 24px rgba(0, 0, 0, 0.2)',
    tooltip: '0 2px 8px rgba(0, 0, 0, 0.25)',
  },
  
  // 圆角系统
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
  
  // 间距系统 - 用于margin和padding
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
    14: '112px',
    16: '128px',
    20: '160px',
    24: '192px',
    28: '224px',
    32: '256px',
    36: '288px',
    40: '320px',
    44: '352px',
    48: '384px',
    52: '416px',
    56: '448px',
    60: '480px',
    64: '512px',
    72: '576px',
    80: '640px',
    96: '768px',
  },
};