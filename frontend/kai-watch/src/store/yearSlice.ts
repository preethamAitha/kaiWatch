import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface YearState {
  selectedYear: number | null;
}

const initialState: YearState = {
  selectedYear: 2022,
};

const yearSlice = createSlice({
  name: 'year',
  initialState,
  reducers: {
    setYear: (state, action: PayloadAction<number | null>) => {
      state.selectedYear = action.payload;
    },
  },
});

export const { setYear } = yearSlice.actions;
export default yearSlice.reducer;
