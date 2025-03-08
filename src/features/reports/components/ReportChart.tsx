import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface ChartData {
  [key: string]: any;
}

interface ChartOptions {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  colors?: string[];
}

interface ReportChartProps {
  type: 'line' | 'bar' | 'pie';
  data: ChartData[];
  options?: ChartOptions;
}

const defaultColors = ['#2196F3', '#4CAF50', '#FFC107', '#F44336', '#9C27B0'];

const ReportChart: React.FC<ReportChartProps> = ({ type, data, options = {} }) => {
  const {
    title,
    xAxisLabel,
    yAxisLabel,
    colors = defaultColors
  } = options;

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: xAxisLabel, position: 'bottom' }} />
              <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: xAxisLabel, position: 'bottom' }} />
              <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              {Object.keys(data[0] || {}).filter(key => key !== 'name').map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: 400, position: 'relative' }}>
      {title && (
        <Typography variant="h6" gutterBottom align="center">
          {title}
        </Typography>
      )}
      {renderChart()}
    </Box>
  );
};

export default ReportChart;