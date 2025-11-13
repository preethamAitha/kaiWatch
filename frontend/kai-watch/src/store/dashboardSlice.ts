// src/store/dashboardSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { vulnsModel } from '../models/dahboardModels';

interface DashboardState {
  data: vulnsModel | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData(state, action: PayloadAction<vulnsModel>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setDashboardData, setLoading, setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
