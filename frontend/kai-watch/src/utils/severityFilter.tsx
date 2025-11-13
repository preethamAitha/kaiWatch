import type {
  GridFilterItem,
  GridFilterInputValueProps,
  GridFilterOperator,
} from "@mui/x-data-grid";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

const SeverityDropdownFilter = (props: GridFilterInputValueProps) => {
  const { item, applyValue } = props;
  const severities = ["Critical", "High", "Medium", "Low"];

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    applyValue({ ...item, value });
  };

  return (
    <FormControl
      fullWidth
      size="small"
      sx={{
        mt: 1,
      }}
    >
      <InputLabel>Severity</InputLabel>
      <Select
        labelId="severity-label"
        label="Severity"
        multiple
        value={item.value || []}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        sx={{
          fontWeight: 500,
          "& .MuiSelect-select": { py: 1 },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "12px",
              boxShadow: 4,
              "& .MuiMenuItem-root": {
                py: 0.8,
              },
            },
          },
        }}
      >
        {severities.map((severity) => (
          <MenuItem key={severity} value={severity}>
            <Checkbox checked={item.value?.includes(severity) || false} />
            <ListItemText
              primary={severity}
              primaryTypographyProps={{ textTransform: "capitalize" }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const severityDropdownOperator: GridFilterOperator = {
  label: "Severity",
  value: "inSeverity",
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (!filterItem.value?.length) return null;
    return (params) => filterItem.value.includes(params.value);
  },
  InputComponent: SeverityDropdownFilter,
};

