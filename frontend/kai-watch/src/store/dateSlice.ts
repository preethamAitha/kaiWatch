import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import dayjs, { Dayjs } from 'dayjs';

interface DateState {
  selectedDate: Dayjs | null;
}

const initialState: DateState = {
  selectedDate: dayjs(), // default to today
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<Dayjs | null>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
