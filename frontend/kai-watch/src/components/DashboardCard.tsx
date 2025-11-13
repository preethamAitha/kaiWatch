import { Box, Typography } from '@mui/material';
import type React from 'react';
import { returnColorText } from '../utils/returnColor';

interface DashboardCardProps {
  title: string;
  value: string | number;
  percentage: string;
  percentageColor: string;
  label: string;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  percentage,
  percentageColor,
  label,
  color
}) => {
  return (
    <Box sx={{
      display:'flex',
      flexDirection:'column',
      gap: 1,
      border: '0.5px solid grey',
      p:'15px',
      borderRadius: 2,
      flex:1,
      maxHeight:'125px'
    }}>
      <Typography sx={{
        fontSize: '17px',
        fontWeight: '500',
        color:color
      }}>
        {title}
      </Typography>
      <Box sx={{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        <Typography sx={{
          fontSize: '20px',
          color:'primary.white',
          fontWeight:'800'
        }}>
          {value}
        </Typography>
        <Typography sx={{
          color: returnColorText(percentageColor),
          fontSize:'12px',
          backgroundColor: percentageColor,
          px:'5px',
          py:'1px',
          borderRadius:2
        }}>
          {percentage}
        </Typography>
        </Box>
        <Typography sx={{
          fontSize: '12px',
          color:'grey',
          fontWeight: '100'
        }}>
          {label}
        </Typography>
      </Box>
  );
};

export default DashboardCard;
