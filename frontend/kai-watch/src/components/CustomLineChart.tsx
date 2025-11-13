import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setYear } from '../store/yearSlice';

import type { RootState } from '../store/store';
import type { LineDataItem } from '../models/dahboardModels';
interface LineDataModel{
  lineData: LineDataItem[]
}

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const daysInMonth = date.getDate();
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(`${monthName} ${i}`);
  }
  return days;
}

export default function CustomLineChart({ lineData }: LineDataModel) {
  console.log(lineData)
  const dispatch = useDispatch();
  const theme = useTheme();
  const selectedYear = useSelector((state: RootState) => state.year.selectedYear);

  const data =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
    theme.palette.primary.main,
  ];

  const yearOptions = Array.from({ length: 2025 - 1975 + 1 }, (_, i) => 1975 + i);

  return (
    <Card variant="outlined" sx={{ width: '100%', height:'370px' }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography variant="h4" component="p" sx={{ py: 1 }}>
            Vulnerabilities over time
          </Typography>
          <Select
            value={selectedYear?.toString()??'2022'}
            onChange={(newYear)=>{
              console.log('newYear,z', newYear.target.value)
              dispatch(setYear(Number(newYear.target.value)))
            }}
            size="small"
            sx={{ minWidth: 100 }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year.toString()}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2 }}>
          Vulnerabilities in 12 months of selected year
        </Typography>

        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={[
            {
              id: 'critical',
              label: 'Critical',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: lineData.map(d => Number(d.critical_vuls)),
            },
            {
              id: 'high',
              label: 'High',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: lineData.map(d => Number(d.high_vuls)),
              area: true,
            },
             {
              id: 'medium',
              label: 'Medium',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: lineData.map(d => Number(d.medium_vuls)),
              area: true,
            },
             {
              id: 'low',
              label: 'Low',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              data: lineData.map(d => Number(d.low_vuls)),
              area: true,
            },
          ]}
          height={250}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-organic': { fill: "url('#organic')" },
            '& .MuiAreaElement-series-referral': { fill: "url('#referral')" },
            '& .MuiAreaElement-series-direct': { fill: "url('#direct')" },
          }}
          hideLegend
        >
          <AreaGradient color={theme.palette.primary.dark} id="organic" />
          <AreaGradient color={theme.palette.primary.main} id="referral" />
          <AreaGradient color={theme.palette.primary.light} id="direct" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
