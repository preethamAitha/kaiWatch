// store/selectedRowsSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedRowsState {
  rows: any[];
}

const initialState: SelectedRowsState = {
  rows: [],
};

export const selectedRowsSlice = createSlice({
  name: 'selectedRows',
  initialState,
  reducers: {
    setSelectedRows: (state, action: PayloadAction<any[]>) => {
      state.rows = action.payload;
    },
    clearSelectedRows: (state) => {
      state.rows = [];
    },
  },
});

export const { setSelectedRows, clearSelectedRows } = selectedRowsSlice.actions;

export default selectedRowsSlice.reducer;
