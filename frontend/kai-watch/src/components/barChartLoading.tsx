import React from 'react';
import { Card, CardContent, Stack, Skeleton, Box } from '@mui/material';

const BarChartLoading: React.FC = () => {
  return (
    <Card variant="outlined" sx={{ maxWidth: '40vw' }}>
      <CardContent>
        <Stack sx={{ justifyContent: 'space-between', mb: 2 }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Skeleton variant="text" width='90%' height={32} />
          </Stack>
          <Skeleton variant="text" width='70%' height={20} />
        </Stack>

        <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-end', height: 250, gap: 2, px: 1 }}>
          {Array.from({ length: 13 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={30}
              height={Math.random() * 150 + 50}
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarChartLoading;
