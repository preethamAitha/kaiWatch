import React from "react";
import { useTheme } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface DateSelectorProps {
  label?: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  label = "Select Date",
  value,
  onChange,
}) => {
  const theme = useTheme();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        sx={{
            width: '100px',
            fontSize: '12px'
        }}
        slotProps={{
          textField: {
            size: "small",
            variant: "outlined",
            sx: {
                padding:0,
              fontSize: 12,
              "& .MuiInputBase-root": {
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                transition: "border-color 0.2s ease",
                p:0,
                height: '35px',
                fontSize:'12px',
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  p:0
                },
                "&.Mui-focused": {
                  borderColor: theme.palette.primary.main,
                  p:0,
                },
              },
              "& .MuiInputBase-input": {
                fontSize: '50px !important',
                padding: "6px 8px",
              },
              "& .MuiInputLabel-root": {
                fontSize: 12,
                p: 0,
                color: theme.palette.text.secondary,
              },
              "& .MuiInputAdornment-root": {
                marginRight: 0,
                fontSize: '12px',
                },
              "& .MuiSvgIcon-root": {
                p: 0,
                color: theme.palette.text.disabled,
                fontSize: 18,
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
