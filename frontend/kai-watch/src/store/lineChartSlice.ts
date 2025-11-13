import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LineDataItem } from '../models/dahboardModels';

interface LineChartState {
  lineData: LineDataItem[];
  lineLoading: boolean;
  lineError: string | null;
}

const initialState: LineChartState = {
  lineData: [],
  lineLoading: false,
  lineError: null,
};

const LineChartSlice = createSlice({
  name: 'lineChart',
  initialState,
  reducers: {
    setLineData(state, action: PayloadAction<LineDataItem[]>) {
      state.lineData = action.payload;
      state.lineLoading = false;
      state.lineError = null;
    },
    setLineLoading(state, action: PayloadAction<boolean>) {
      state.lineLoading = action.payload;
    },
    setLineError(state, action: PayloadAction<string>) {
      state.lineError = action.payload;
      state.lineLoading = false;
    },
  },
});

export const { setLineData, setLineLoading, setLineError } = LineChartSlice.actions;
export default LineChartSlice.reducer;
