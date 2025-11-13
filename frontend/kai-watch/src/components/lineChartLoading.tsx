import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export default function LineChartLoading() {
  const dataPoints = Array.from({ length: 30 });

  return (
    <Card variant="outlined" sx={{ maxWidth: '40vw', height:'370px', flex:1 }}>
      <CardContent>
        <Stack sx={{ justifyContent: 'space-between', mb: 2 }}>
          <Stack
            direction="row"
            sx={{ alignContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center', gap: 1 }}
          >
            <Skeleton variant="text" width='100%' height={40} />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Stack spacing={1} sx={{ minWidth: 50 }}>
            <Skeleton variant="rectangular" width={40} height={20} />
            <Skeleton variant="rectangular" width={40} height={20} />
            <Skeleton variant="rectangular" width={40} height={20} />
            <Skeleton variant="rectangular" width={40} height={20} />
            <Skeleton variant="rectangular" width={40} height={20} />
          </Stack>

          <Stack direction="row" spacing={1} sx={{ flex: 1, alignItems: 'flex-end', height: 250 }}>
            {dataPoints.map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rectangular"
                width={10}
                height='250'
              />
            ))}
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          {dataPoints.map((_, idx) => (
            <Skeleton key={idx} variant="rectangular" width={10} height={15} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
