import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

interface Vulnerability {
  severity: 'critical' | 'high' | 'medium' | 'low';
  count?: number;
}

interface StyledTextProps {
  variant: 'primary' | 'secondary';
}

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<StyledTextProps>(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: { variant: 'primary' },
      style: { fontSize: theme.typography.h5.fontSize, fontWeight: theme.typography.h5.fontWeight },
    },
    {
      props: { variant: 'secondary' },
      style: { fontSize: theme.typography.body2.fontSize, fontWeight: theme.typography.body2.fontWeight },
    },
  ],
}));

interface PieCenterLabelProps {
  primaryText: string;
  secondaryText: string;
}

function SeverityPieCenterLabel({ primaryText, secondaryText }: PieCenterLabelProps) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

interface Props {
  selectedRows: { severity: 'critical' | 'high' | 'medium' | 'low' }[];
}

// Keep the original colors
const severityColors = [
  'rgba(244, 54, 54, 0.7)',   // critical
  'rgba(215, 49, 49, 0.7)',   // high
  'rgba(244, 212, 54, 0.7)',  // medium
  'rgba(57, 244, 54, 0.7)',   // low
];

export default function VulnerabilitySeverityPieChart({ selectedRows }: Props) {
  const severityCounts: Record<string, number> = selectedRows.reduce((acc, vuln) => {
    acc[vuln.severity] = (acc[vuln.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = [
    { label: 'Critical', value: severityCounts.critical || 0 },
    { label: 'High', value: severityCounts.high || 0 },
    { label: 'Medium', value: severityCounts.medium || 0 },
    { label: 'Low', value: severityCounts.low || 0 },
  ];

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1, border: '1px solid grey', borderRadius:2 }}
    >
      <CardContent>
        <Typography  variant="h6">
          Vulnerabilities by Severity
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            my: 2,
          }}
        >
          <PieChart
            colors={severityColors}
            margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
            widths="100%" 
            height={260}
            hideLegend
          >
            <SeverityPieCenterLabel
              primaryText={`${selectedRows.length}`}
              secondaryText="Total"
            />
          </PieChart>
        </Box>

        {data.map((severity, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 1 }}>
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {severity.label}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {severity.value}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label={`Number of ${severity.label} vulnerabilities`}
                value={severity.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: severityColors[index],
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Box>
  );
}
