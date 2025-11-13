// src/store/dashboardSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { vulnsModel } from '../models/dahboardModels';

interface DashboardPState {
  dataP: vulnsModel | null;
  loadingP: boolean;
  errorP: string | null;
}

const initialState: DashboardPState = {
  dataP: null,
  loadingP: false,
  errorP: null,
};

const dashboardSlice = createSlice({
  name: 'dashboardP',
  initialState,
  reducers: {
    setDashboardPData(state, action: PayloadAction<vulnsModel>) {
      state.dataP = action.payload;
      state.loadingP = false;
      state.errorP = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loadingP = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.errorP = action.payload;
      state.loadingP = false;
    },
  },
});

export const { setDashboardPData, setLoading, setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
