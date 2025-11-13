import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';
import type { FreqDataItem } from '../models/dahboardModels.ts';

interface chartDataModel{
  data: FreqDataItem[]
}

export default function CustomBarChart({ data }: chartDataModel) {
  console.log("Inside the custom bar chart comp",data)
  var xAxisData
  var yAxisData
  console.log("retrieveing data", data)
  xAxisData = data.map(item => item.factorname);
  yAxisData = data.map(item => Number(item.frequency));
  console.log(xAxisData)
  console.log(xAxisData)
  console.log(yAxisData)
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];
  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p" sx={{py:1}}>
              Risk factor frequency
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Riskfactor fequencies for the selected time period
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: xAxisData,
              height: 24,
              tickLabelStyle:{
                fontSize:'3px',
              }
            },
          ]}
          yAxis={[{ 
            width: 50,
            valueFormatter: (value: number) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value.toString();
            }
          }]}
          series={[
            {
              id: 'frequency',
              label: 'Frequency',
              data: yAxisData,
              stack: 'A',
            },
          ]}
          height={260}
          margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
          grid={{ horizontal: false }}
          hideLegend
        />
      </CardContent>
    </Card>
  );
}