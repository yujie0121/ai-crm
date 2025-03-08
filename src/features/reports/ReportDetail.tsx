import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import type { ReportGenerationResult } from '../../ai/models';

interface ReportDetailProps {
  report: ReportGenerationResult;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report }) => {
  return (
    <Box sx={{ maxWidth: 2000, margin: '0 auto', width: '100%' }}>
      <Card>
        <CardContent>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            {report.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            生成时间: {report.generatedDate.toLocaleString()}
          </Typography>
          <Typography variant="body1" paragraph>
            {report.summary}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {report.sections.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              {section.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {section.content}
            </Typography>

            {section.charts && section.charts.length > 0 && (
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {section.charts.map((chart, chartIndex) => (
                  <Grid item xs={12} md={6} key={chartIndex}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          {chart.type === 'line' ? '趋势图' :
                           chart.type === 'bar' ? '柱状图' :
                           chart.type === 'pie' ? '饼图' : '图表'}
                        </Typography>
                        {/* 这里将集成实际的图表组件 */}
                        <Box
                          sx={{
                            height: 300,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.default'
                          }}
                        >
                          <Typography color="text.secondary">
                            [图表占位符]
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            AI分析建议
          </Typography>
          {report.recommendations.map((recommendation, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1">
                {recommendation}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="caption" color="text.secondary">
            * 本报告由AI自动生成，仅供参考
          </Typography>
        </Box>
      </CardContent>
    </Card>
    </Box>
  );
}

export default ReportDetail;