import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const CustomLoader: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p:'15px',
        minHeight: '125px',
        width: '100%',
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default CustomLoader;
