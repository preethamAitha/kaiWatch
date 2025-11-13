import React, { useState } from 'react';
import { Alert, Box, Button, ButtonGroup, Snackbar, Typography } from '@mui/material';
import { useEffect } from 'react';
import DateSelector from '../components/DateSelector';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { setDate } from '../store/dateSlice';
import { setEndDate } from '../store/endDateSlice';
import SearchBar from '../components/SearchBar';
import DashboardCard from '../components/DashboardCard';
import CustomBarChart from '../components/CustomBarChart.tsx';
import CustomLineChart from '../components/CustomLineChart.tsx';
import CustomizedDataGrid from '../components/CustomDataGrid.tsx';
import axiosClient from '../services/axiosClient.ts';
import { setDashboardData, setError, setLoading } from '../store/dashboardSlice.ts';
import formatNumber from '../utils/formatNumber.ts';
import DashboardCardLoading from '../components/DashboardCardLoading.tsx';
import dayjs from 'dayjs';
import { setDashboardPData } from '../store/dashboardPSlice.ts';
import { calculatePercentage } from '../utils/calculatePercentage.ts';
import { returnColor } from '../utils/returnColor.ts';
import { setFreqData, setFreqError, setFreqLoading } from '../store/freqChartSlice.ts';
import BarChartLoading from '../components/barChartLoading.tsx';
import { setLineData, setLineError, setLineLoading } from '../store/lineChartSlice.ts';
import LineChartLoading from '../components/lineChartLoading.tsx';
import { setvulnData, setvulnLoading } from '../store/vulnTableSlice.ts';
import DataGridLoading from '../components/dataGridLoading.tsx';
import { mapVulnDataToRows } from '../data/gridData.tsx';
import { setVulnSortBy, setVulnSortOrder } from '../store/vulnPropsSlice.ts';
import { clearAllFilters, setFilter } from '../store/filterHandlerSlice.ts';
import type { GridCallbackDetails, GridPaginationModel, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { setPageNumber } from '../store/pageSlice.ts';
import { downloadCSV } from '../utils/downloadFile.ts';
import { setSelectedRows } from '../store/selectedRowsSlice.ts';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.date.selectedDate);
  const selectedEndDate = useSelector((state: RootState) => state.endDate.selectedEndDate);
  const selectedYear = useSelector((state: RootState)=>state.year.selectedYear);
  const vulnProps = useSelector((state: RootState) => state.vulnProps);
  const filters = useSelector((state: RootState) => state.vulnFilter);
  const sorting = useSelector((state: RootState) => state.vulnProps);
  const pagination = useSelector((state: RootState) => state.page);
  const selectedRows = useSelector((state: RootState) => state.selectedRows.rows);
  const selectedIdsArray: GridRowId[] = selectedRows.map(row => row.id);
  const [open, setOpen] = useState(false);
  const selectedIdsSet: Set<GridRowId> = new Set(selectedIdsArray);
  const selectionModel: GridRowSelectionModel = {
    type: 'include',
    ids: selectedIdsSet
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setFreqLoading(true));
        dispatch(setLoading(true));
        const response = await axiosClient.get(
          `/dashboard/charts/trend_analysis/${selectedDate?.format('YYYY-MM-DD') || '2022-10-10'}/${
            selectedEndDate?.format('YYYY-MM-DD') || '2025-10-10'
          }`
        );
        const responseP = await axiosClient.get(
          `/dashboard/charts/trend_analysis/${
            selectedDate ? selectedDate.subtract(30, 'day').format('YYYY-MM-DD') : dayjs().subtract(30, 'day').format('YYYY-MM-DD')
          }/${selectedDate ? selectedDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')}`
        );
        dispatch(setDashboardPData(responseP.data[0]));
        dispatch(setDashboardData(response.data[0]));
        dispatch(setLoading(false));
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to fetch data'));
      }

      try{
        const responseFreq = await axiosClient.get(
          `/dashboard/charts/risk_factors/${selectedDate?.format('YYYY-MM-DD') || '2022-10-10'}/${
            selectedEndDate?.format('YYYY-MM-DD') || '2025-10-10'
          }`
        )
        dispatch(setFreqData(responseFreq.data));
        dispatch(setFreqLoading(false));
      }catch(err: any){
        dispatch(setFreqError(err.message || 'Failed to fetch frequency data'))
      }
    };

    fetchData();
  }, [dispatch, selectedDate, selectedEndDate]);
  useEffect(() => {
     dispatch(setLineLoading(true));
    const fetchData= async () => {
      try{
        const responseLine = await axiosClient.get(
          `/dashboard/charts/_series/${Number(selectedYear)}`
        )
        dispatch(setLineData(responseLine.data));
        dispatch(setLineLoading(false));
      }catch(err: any){
        dispatch(setLineError(err.message || 'Failed to fetch Line chart data'))
      }
    }
    fetchData()
  }, [dispatch, selectedYear])

  useEffect(() => {
  dispatch(setvulnLoading(true));
  const fetchData = async () => {
    const params = {
      ...filters,
      ...{ limit: 100 }
    };
    try {
      const response = await axiosClient.get('/vulnerability', { params });
      dispatch(setvulnData(response.data));
    } catch (err: any) {
      console.error(err);
    } finally {
      dispatch(setvulnLoading(false));
    }
  };
  fetchData();
}, [dispatch, filters]);
  useEffect(() => {
  }, [dispatch, vulnProps.sortBy, vulnProps.sortOrder]);
   const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  const { data, loading, error } = useSelector((state: RootState) => state.dashboard);
  const { dataP, loadingP, errorP } = useSelector((state: RootState) => state.dashboardP);
  const {freqData, freqLoading, freqError} = useSelector((state: RootState) => state.freqChart);
  const {lineData, lineLoading, lineError} = useSelector((state: RootState) => state.lineChart);
  const {vulnData, vulnLoading, vulnError} = useSelector((state: RootState) => state.vulnTable);
  
  const rows = React.useMemo(() => {
    if (!Array.isArray(vulnData)) return [];
    return mapVulnDataToRows(vulnData);
  }, [vulnData]);
  // const dashboardData = useSelector((state: RootState) => state.dashboard.data);
  // const dashboardData = data
  return (
    <Box sx={{
      display:'block',
      width: '100%',
      minHeight:'100%',
      alignItems:'start',
      // border:'1px solid white',
    }}>
      <Box sx={{ 
        width:'100%',
        display: 'flex', 
        alignItems: 'start', 
        gap: 2, 
        p: 2,
      }}>
        <Box sx={{
          display: 'flex',
          alignItems:'center',
          height: '40px'
        }}>
          <Typography variant='h4'>
            Dashboard
          </Typography>
        </Box>
        <Box sx={{
          width:'100%',
          display: 'flex',
          gap:2,
          flexDirection: 'row',
          justifyContent:'flex-end',
          alignItems:'end',
          height: '40px'
        }}>
          <SearchBar/>
          <DateSelector
            label="From"
            value={selectedDate}
            onChange={(newDate) => {
              dispatch(setDate(newDate))
            }}
          />
          <DateSelector
            label="To"
            value={selectedEndDate}
            onChange={(newDate) => {
              dispatch(setEndDate(newDate))
            }}
          />
        </Box>
      </Box>
      <Typography variant='h4' sx={{
        px: 2,
        fontWeight:'bold'
      }}>
        Vulnerabilities
      </Typography>
      <Box
        gap={2}
        alignItems="center"

        justifyContent="start"
        sx={{ 
          width: "100%", 
          p: 2, 
          display:'flex',
        }}
      >
        {loading?(
          <><DashboardCardLoading /><DashboardCardLoading /><DashboardCardLoading /><DashboardCardLoading /></>
        ):(
          <>
          <DashboardCard
            title='Total'
            value={formatNumber(data?.vulns)}
            percentage={calculatePercentage(dataP?.vulns, data?.vulns)}
            percentageColor={returnColor(calculatePercentage(dataP?.vulns, data?.vulns))}
            label="In the selected date range "
            color='primary.main' />
          <DashboardCard
            title='Critical'
            value={formatNumber(data?.critical_vuls)}
            percentage={calculatePercentage(dataP?.critical_vuls, data?.critical_vuls)}
            percentageColor={returnColor(calculatePercentage(dataP?.critical_vuls, data?.critical_vuls))}
            label="In the selected date range "
            color='error.main' />
            <DashboardCard
              title='High'
              value={formatNumber(data?.high_vuls)}
              percentage={calculatePercentage(dataP?.high_vuls, data?.high_vuls)}
              percentageColor={returnColor(calculatePercentage(dataP?.high_vuls, data?.high_vuls))}
              label="In the selected date range "
              color='error.light' />
            <DashboardCard
              title='Medium'
              value={formatNumber(data?.medium_vuls)}
              percentage={calculatePercentage(dataP?.medium_vuls, data?.medium_vuls)}
              percentageColor={returnColor(calculatePercentage(dataP?.medium_vuls, data?.medium_vuls))}
              label="In the selected date range "
              color='warning.main' />
            <DashboardCard
              title='Low'
              value={formatNumber(data?.low_vuls)}
              percentage={calculatePercentage(dataP?.low_vuls, data?.low_vuls)}
              percentageColor={returnColor(calculatePercentage(dataP?.low_vuls, data?.low_vuls))}
              label="In the selected date range "
              color='success.main' />
              </>
        )}
        
      </Box>
      <Box sx={{
        display:'flex',
        flexDirection: 'row',
        gap:2,
        p:2
      }}>
        {lineLoading?(<LineChartLoading/>):(
          <CustomLineChart lineData={lineData}/>
        )}
        {freqLoading?(<BarChartLoading/>):(
          <CustomBarChart  data={freqData}/>
        )}
      </Box>
      {/* {vulnLoading || !rows.length ?(<DataGridLoading/>):(
        
      )} */}
      
    <CustomizedDataGrid data={rows} loading={vulnLoading}
      onsSortChangeHandler={async (model) => {
        const filterParams = new URLSearchParams();
        if (filters.severity.length) filterParams.append('severity', filters.severity.join(','));
        if (filters.status.length) filterParams.append('status', filters.status.join(','));
        if (filters.kaiStatus.length) filterParams.append('kaiStatus', filters.kaiStatus.join(','));

        console.log('string URL', filterParams.toString());
        if (model.length == 0) {
          dispatch(setvulnLoading(true));
          const responseVulnData = await axiosClient.get(`/vulnerability?${filterParams.toString()}&limit=100`);
          console.log("testing table sort: ", responseVulnData);
          dispatch(setVulnSortOrder('none'));
          dispatch(setVulnSortBy(null));
          dispatch(setvulnData(responseVulnData.data));
          dispatch(setvulnLoading(false));
        }
        else {
          switch (model[0].field) {
            case "fixDate": {
              dispatch(setvulnLoading(true));
              console.log(`/vulnerability?sortBy=fixDate&sortOrder=${model[0].sort}&limit=100&${filterParams.toString()}`);
              const responseVulnData = await axiosClient.get(`/vulnerability?sortBy=fixDate&sortOrder=${model[0].sort}&${filterParams.toString()}&limit=100`);
              console.log("testing table sort: ", responseVulnData);
              if (model[0].sort) {
                dispatch(setVulnSortOrder(model[0].sort));
              }
              else {
                dispatch(setVulnSortOrder('none'));
              }
              dispatch(setVulnSortBy('fixDate'));
              dispatch(setvulnData(responseVulnData.data));
              dispatch(setvulnLoading(false));
              break;
            }
            case "severity": {
              dispatch(setvulnLoading(true));
              console.log(`/vulnerability?sortBy=severity&sortOrder=${model[0].sort}&limit=100&${filterParams.toString()}`);
              const responseVulnData = await axiosClient.get(`/vulnerability?sortBy=severity&sortOrder=${model[0].sort}&${filterParams.toString()}&limit=100`);
              console.log("testing table sort: ", responseVulnData);
              if (model[0].sort) {
                dispatch(setVulnSortOrder(model[0].sort == 'asc' ? 'asc' : 'desc'));
              }
              else {
                dispatch(setVulnSortOrder('none'));
              }
              dispatch(setVulnSortBy('severity'));
              dispatch(setvulnData(responseVulnData.data));
              dispatch(setvulnLoading(false));
              break;
            }
            case "published": {
              dispatch(setvulnLoading(true));
              console.log(`/vulnerability?sortBy=published&sortOrder=${model[0].sort}&limit=100&${filterParams.toString()}`);
              const responseVulnData = await axiosClient.get(`/vulnerability?sortBy=published&sortOrder=${model[0].sort}&${filterParams.toString()}&limit=100`);
              console.log("testing table sort: ", responseVulnData);
              if (model[0].sort) {
                dispatch(setVulnSortOrder(model[0].sort));
              }
              else {
                dispatch(setVulnSortOrder('none'));
              }
              dispatch(setVulnSortBy('published'));
              dispatch(setvulnData(responseVulnData.data));
              dispatch(setvulnLoading(false));
              break;
            }
          }
        }

      } }

      onFIlterChangeHandler={async (model) => {
        const sortParams = new URLSearchParams();
        if (sorting.sortBy) sortParams.append('sortBy', sorting.sortBy);
        if (sorting.sortOrder) sortParams.append('sortOrder', sorting.sortOrder);
        console.log("Sorting parms, ", sortParams.toString());
        if (!model.items.length || !model.items[0].value && filters.severity.length == 0 && filters.kaiStatus.length == 0 && filters.status.length == 0) {
          dispatch(clearAllFilters());
          dispatch(setvulnLoading(true));

          const responseVulnData = await axiosClient.get(`/vulnerability?limit=100&${sortParams.toString()}`);
          dispatch(setvulnData(responseVulnData.data));
          dispatch(setvulnLoading(false));
          return;
        }
        else if (!model.items.length || !model.items[0].value) {
          return;
        }

        const field = model.items[0].field;
        const value = model.items[0].value;

        const values = Array.isArray(value)
          ? value.map((v) => v.toLowerCase())
          : value.split(",").map((v: string) => v.trim().toLowerCase());

        dispatch(setFilter({ field, values }));

        const activeFilters = {
          ...filters,
          [field]: values,
        };

        const queryParams = new URLSearchParams();
        Object.entries(activeFilters).forEach(([key, vals]) => {
          if (vals.length > 0) {
            queryParams.append(key, vals.join(","));
          }
        });

        dispatch(setvulnLoading(true));
        try {
          console.log(`/vulnerability?${queryParams.toString()}&limit=100&${sortParams.toString()}`);
          const response = await axiosClient.get(`/vulnerability?${queryParams.toString()}&limit=100&${sortParams.toString()}`);
          dispatch(setvulnData(response.data));
        } catch (error) {
          console.error("Error fetching filtered data:", error);
        } finally {
          dispatch(setvulnLoading(false));
        }
      } } pageSize={pagination.pageSize} pageNumber={pagination.selectedPage} onPageModelChangeHandler={function (model: GridPaginationModel): void {
        // if((model.page+1)%5==0){
        //   console.log("Load more data")
        // }
        // else{
        //   dispatch(setPageNumber(model.page+1))
        // }
        console.log('model testing', model);
      } }
      selectModel={selectionModel}
      onSelectionModelChange={(model: GridRowSelectionModel, callbackData: GridCallbackDetails)=>{
        console.log('Selected rows model',model)
        // console.log('Selected rows callbackData',callbackData)
        const selectedIds = Array.from(model.ids);
        const selectedData = rows.filter((row) => selectedIds.includes(row.id));
        console.log(selectedData)
        dispatch(setSelectedRows(selectedData));
      }}
    />
      <Box sx={{
        width: '100vw%',
        p: '15px',
        display:'flex',
        flexDirection: 'row',
        float:'inline-end'
      }}>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            onClick={async () => {
              const sortParams = new URLSearchParams();
              if (sorting.sortBy) sortParams.append('sortBy', sorting.sortBy);
              if (sorting.sortOrder) sortParams.append('sortOrder', sorting.sortOrder);

              const tempFilters = {
                ...filters,
                kaiStatus: ['invalid - norisk'],
              };
              dispatch(setFilter({ field: 'kaiStatus', values: ['invalid - norisk'] }));

              const queryParams = new URLSearchParams();
              Object.entries(tempFilters).forEach(([key, vals]) => {
                if (vals.length > 0) queryParams.append(key, vals.join(','));
              });

              dispatch(setvulnLoading(true));
              try {
                const response = await axiosClient.get(`/vulnerability?${queryParams.toString()}&${sortParams.toString()}&limit=100`);
                dispatch(setvulnData(response.data));

              } catch (err) {
                console.error(err);
              } finally {
                dispatch(setvulnLoading(false));
              }
            }}
          >
            Analysis
          </Button>

          <Button
            onClick={async () => {
              const sortParams = new URLSearchParams();
              if (sorting.sortBy) sortParams.append('sortBy', sorting.sortBy);
              if (sorting.sortOrder) sortParams.append('sortOrder', sorting.sortOrder);

              const tempFilters = {
                ...filters,
                kaiStatus: ['ai-invalid-norisk'],
              };
              dispatch(setFilter({ field: 'kaiStatus', values: ['invalid - norisk'] }));

              const queryParams = new URLSearchParams();
              Object.entries(tempFilters).forEach(([key, vals]) => {
                if (vals.length > 0) queryParams.append(key, vals.join(','));
              });

              dispatch(setvulnLoading(true));
              try {
                const response = await axiosClient.get(`/vulnerability?${queryParams.toString()}&${sortParams.toString()}&limit=100`);
                dispatch(setvulnData(response.data));

                // Only update Redux after successful fetch
              } catch (err) {
                console.error(err);
              } finally {
                dispatch(setvulnLoading(false));
              }
            }}
          >
            AI-Analysis
          </Button>
          <Button onClick={()=>downloadCSV(vulnData)}>Export</Button>
          <Button onClick={async ()=>{
            if(selectedRows.length>1 &&selectedRows.length>=2){
              console.log(selectedRows)
              navigate("/compare")
            }
            else{
              setOpen(true)
            }
          }}>Compare</Button>
          <Snackbar
            open={open}
            autoHideDuration={3000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              Please select at least 2 rows to compare
            </Alert>
          </Snackbar>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Dashboard;