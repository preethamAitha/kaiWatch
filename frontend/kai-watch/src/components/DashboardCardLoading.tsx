import { Box } from '@mui/material';
import type React from 'react';

const DashboardCardLoading: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        borderRadius: 2,
        flex: 1,
        p: 2,
        backgroundColor: '#2c2c2c',
        minHeight: '100px',
        animation: 'pulse 1.5s infinite',
        '@keyframes pulse': {
          '0%': { opacity: 0.6 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.6 },
        },
      }}
    >
      <Box sx={{ width: '40%', height: 16, borderRadius: 1, backgroundColor: '#444' }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ width: '30%', height: 24, borderRadius: 1, backgroundColor: '#555' }} />
        <Box sx={{ width: '20%', height: 16, borderRadius: 1, backgroundColor: '#555' }} />
      </Box>

      <Box sx={{ width: '60%', height: 12, borderRadius: 1, backgroundColor: '#444' }} />
    </Box>
  );
};

export default DashboardCardLoading;
