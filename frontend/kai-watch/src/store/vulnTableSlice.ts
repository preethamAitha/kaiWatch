import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { VulnTableItem } from '../models/dahboardModels';

interface VulnTableState {
  vulnData: VulnTableItem[];
  vulnLoading: boolean;
  vulnError: string | null;
}

const initialState: VulnTableState = {
  vulnData: [],
  vulnLoading: false,
  vulnError: null,
};

const VulnTableSlice = createSlice({
  name: 'vulnTable',
  initialState,
  reducers: {
    setvulnData(state, action: PayloadAction<VulnTableItem[]>) {
      state.vulnData = action.payload;
      state.vulnLoading = false;
      state.vulnError = null;
    },
    setvulnLoading(state, action: PayloadAction<boolean>) {
      state.vulnLoading = action.payload;
    },
    setvulnError(state, action: PayloadAction<string>) {
      state.vulnError = action.payload;
      state.vulnLoading = false;
    },

  },
});

export const { setvulnData, setvulnLoading, setvulnError } = VulnTableSlice.actions;
export default VulnTableSlice.reducer;
