import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  selectedPage: number;
  pageSize: number
}

const initialState: PageState = {
  selectedPage: 0,
  pageSize: 20
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.selectedPage = action.payload;
    },
    setPageSize:(state, action: PayloadAction<number>)=>{
        state.pageSize = action.payload
    }
  },
});

export const { setPageNumber, setPageSize } = pageSlice.actions;
export default pageSlice.reducer;
