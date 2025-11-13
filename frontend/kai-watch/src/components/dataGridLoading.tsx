import { Box, Skeleton } from '@mui/material';

export default function DataGridLoading() {
  return (
    <Box
      sx={{
        width: '100%',
        height: 500,
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        {[...Array(8)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width={`${10 + i * 5}%`}
            height={35}
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {[...Array(10)].map((_, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 1 }}>
            {[...Array(8)].map((_, j) => (
              <Skeleton
                key={j}
                variant="rectangular"
                width={`${10 + j * 5}%`}
                height={30}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
