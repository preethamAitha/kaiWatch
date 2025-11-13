import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FreqDataItem } from '../models/dahboardModels';

interface FreqChartState {
  freqData: FreqDataItem[];
  freqLoading: boolean;
  freqError: string | null;
}

const initialState: FreqChartState = {
  freqData: [],
  freqLoading: false,
  freqError: null,
};

const freqChartSlice = createSlice({
  name: 'freqChart',
  initialState,
  reducers: {
    setFreqData(state, action: PayloadAction<FreqDataItem[]>) {
      state.freqData = action.payload;
      state.freqLoading = false;
      state.freqError = null;
    },
    setFreqLoading(state, action: PayloadAction<boolean>) {
      state.freqLoading = action.payload;
    },
    setFreqError(state, action: PayloadAction<string>) {
      state.freqError = action.payload;
      state.freqLoading = false;
    },
  },
});

export const { setFreqData, setFreqLoading, setFreqError } = freqChartSlice.actions;
export default freqChartSlice.reducer;
