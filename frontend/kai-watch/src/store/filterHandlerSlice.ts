// src/store/vulnFilterSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface VulnFilterState {
  severity: string[];
  status: string[];
  kaiStatus: string[];
}

const initialState: VulnFilterState = {
  severity: [],
  status: [],
  kaiStatus: [],
};

const vulnFilterSlice = createSlice({
  name: "vulnFilter",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ field: string; values: string[] }>
    ) => {
      const { field, values } = action.payload;
      if (["severity", "status", "kaiStatus"].includes(field)) {
        (state as any)[field] = values;
      }
    },
    clearFilter: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (["severity", "status", "kaiStatus"].includes(field)) {
        (state as any)[field] = [];
      }
    },
    clearKaiFilter: (state) => {
        state.kaiStatus = [];
    },
    clearAllFilters: (state) => {
      state.severity = [];
      state.status = [];
      state.kaiStatus = [];
    },
  },
});

export const { setFilter, clearFilter, clearAllFilters } = vulnFilterSlice.actions;
export default vulnFilterSlice.reducer;
