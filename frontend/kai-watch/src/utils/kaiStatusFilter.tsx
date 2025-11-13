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

const KaiStatusDropdownFilter = (props: GridFilterInputValueProps) => {
  const { item, applyValue } = props;
  const severities = ["ai-invalid-norisk", "invalid - norisk"];

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
      <InputLabel>KaiStatus</InputLabel>
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
        {severities.map((kaiStatus) => (
          <MenuItem key={kaiStatus} value={kaiStatus}>
            <Checkbox checked={item.value?.includes(kaiStatus) || false} />
            <ListItemText
              primary={kaiStatus}
              primaryTypographyProps={{ textTransform: "capitalize" }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const kaiStatusDropdownOperator: GridFilterOperator = {
  label: "KaiStatus",
  value: "inKaiStatus",
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (!filterItem.value?.length) return null;
    return (params) => filterItem.value.includes(params.value);
  },
  InputComponent: KaiStatusDropdownFilter,
};

