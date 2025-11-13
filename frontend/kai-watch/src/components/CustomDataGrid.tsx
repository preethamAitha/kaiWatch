import { DataGrid, type GridCallbackDetails, type GridFilterModel, type GridPaginationModel, type GridRowSelectionModel, type GridSortModel } from '@mui/x-data-grid';
import { columns } from '../data/gridData.tsx';
import type { VulnGridRow } from '../models/dahboardModels.ts';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store.ts';

interface VulDataGridModel{
  data: VulnGridRow[];
  onsSortChangeHandler: (model: GridSortModel) => void;
  onFIlterChangeHandler: (model: GridFilterModel) => void;
  loading: boolean,
  pageSize: number,
  pageNumber: number,
  onPageModelChangeHandler: (model: GridPaginationModel)=>void,
  selectModel: GridRowSelectionModel,
  onSelectionModelChange: (model: GridRowSelectionModel, callbackData: GridCallbackDetails)=>void
}

export default function CustomizedDataGrid({ data,onsSortChangeHandler,
  onFIlterChangeHandler, 
  loading, 
  pageSize, 
  pageNumber, 
  onPageModelChangeHandler, 
  onSelectionModelChange, 
  selectModel 
}: VulDataGridModel) {
  const vulnProps = useSelector((state: RootState) => state.vulnProps);
  console.log(vulnProps.sortOrder)
  return (
    <DataGrid
    sx={{
      width: '100%'
    }}
    loading={loading}
      sortModel={
        vulnProps.sortOrder && vulnProps.sortOrder !== 'none' && vulnProps.sortBy
          ? [{ field: vulnProps.sortBy, sort: vulnProps.sortOrder }]
          : []
      }
      rowSelectionModel={selectModel}
      onRowSelectionModelChange={(model, callbackData)=>{onSelectionModelChange(model, callbackData)}}
      checkboxSelection
      rows={data}
      columns={columns}
      sortingMode="server"
      filterMode="server"
      onSortModelChange={(model) => {onsSortChangeHandler(model)}}
      onFilterModelChange={(model) => {onFIlterChangeHandler(model)}}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}