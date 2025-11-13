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

const StatusDropdownFilter = (props: GridFilterInputValueProps) => {
  const { item, applyValue } = props;
  const severities = ["Affected", "Fixed", "Deferred"];

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
      <InputLabel>Status</InputLabel>
      <Select
        labelId="status-label"
        label="Status"
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
        {severities.map((status) => (
          <MenuItem key={status} value={status}>
            <Checkbox checked={item.value?.includes(status) || false} />
            <ListItemText
              primary={status}
              primaryTypographyProps={{ textTransform: "capitalize" }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const statusDropdownOperator: GridFilterOperator = {
  label: "Status",
  value: "inStatus",
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (!filterItem.value?.length) return null;
    return (params) => filterItem.value.includes(params.value);
  },
  InputComponent: StatusDropdownFilter,
};

