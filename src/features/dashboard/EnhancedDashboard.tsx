import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { Lightbulb, SmartToy } from '@mui/icons-material';

const EnhancedDashboard: React.FC = () => {
  const theme = useTheme();
  const [aiInsightLoading, setAiInsightLoading] = useState(false);

  const generateAiInsight = () => {
    setAiInsightLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setAiInsightLoading(false);
    }, 2000);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <SmartToy sx={{ mr: 1, color: theme.palette.secondary.main }} />
        <Typography variant="h6">AI业务洞察</Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={generateAiInsight}
        disabled={aiInsightLoading}
        startIcon={aiInsightLoading ? <CircularProgress size={20} /> : <Lightbulb />}
      >
        生成洞察
      </Button>
      {aiInsightLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : null}
    </Box>
  );
};

export default EnhancedDashboard;