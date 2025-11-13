// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import dateReducer from './dateSlice';
import endDateReducer from './endDateSlice'
import themeReducer from'./themeSlice';
import dashboardReducer from './dashboardSlice'
import dashboardPReducer from './dashboardPSlice'
import freqChartReducer from './freqChartSlice'
import lineChartReducer from './lineChartSlice'
import yearReducer from './yearSlice'
import vulnTableReduder from './vulnTableSlice'
import vulnPropsReducer from './vulnPropsSlice'
import vulnFilterReducer from './filterHandlerSlice'
import pageReducer from './pageSlice'
import selectedRowsReducer from './selectedRowsSlice'
export const store = configureStore({
  reducer: {
    search: searchReducer,
    date: dateReducer,
    theme: themeReducer,
    endDate: endDateReducer,
    dashboard: dashboardReducer,
    dashboardP: dashboardPReducer,
    freqChart: freqChartReducer,
    lineChart: lineChartReducer,
    year: yearReducer,
    vulnTable: vulnTableReduder,
    vulnProps: vulnPropsReducer,
    vulnFilter: vulnFilterReducer,
    page: pageReducer,
    selectedRows: selectedRowsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;