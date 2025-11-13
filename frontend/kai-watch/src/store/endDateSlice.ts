import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';

interface EndDateState {
  selectedEndDate: Dayjs | null;
}

const initialState: EndDateState = {
  selectedEndDate: dayjs(), // default to today
};

const dateSlice = createSlice({
  name: 'endDate',
  initialState,
  reducers: {
    setEndDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.selectedEndDate = action.payload;
    },
  },
});

export const { setEndDate } = dateSlice.actions;
export default dateSlice.reducer;
