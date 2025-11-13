import Chip from '@mui/material/Chip';
import type { GridColDef } from '@mui/x-data-grid';
import type { VulnTableItem } from '../models/dahboardModels';
import dayjs from 'dayjs';
import { severityDropdownOperator } from '../utils/severityFilter';
import {kaiStatusDropdownOperator} from '../utils/kaiStatusFilter'
import {statusDropdownOperator} from '../utils/statusFilter'


function renderStatus(severity: 'critical' | 'high' | 'medium' | 'low') {
  const colors: Record<typeof severity, string> = {
    critical: 'rgba(244, 54, 54, 0.2)',
    high: 'rgba(215, 49, 49, 0.2)',
    medium: 'rgba(244, 212, 54, 0.2)',
    low: 'rgba(57, 244, 54, 0.2)',
  };
  const textColors: Record<typeof severity, string> = {
    critical: 'rgba(244, 54, 54)',
    high: 'rgba(215, 49, 49)',
    medium: 'rgba(244, 212, 54)',
    low: 'rgba(57, 244, 54)',
  };
  return (
    <Chip
      label={severity}
      size="small"
      sx={{
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'capitalize',
        backgroundColor: colors[severity],
        color: textColors[severity]
      }}
    />
  );
}

export default renderStatus;

export const columns: GridColDef[] = [
  { 
    field: 'cve', 
    headerName: 'CVE', 
    flex: 1.5, 
    minWidth: 200,
    filterable: false,
    sortable: false
  },
  {
    field: 'severity',
    headerName: 'Severity',
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value as any),
    filterOperators: [severityDropdownOperator],
  },
  {
    field: 'cvss',
    headerName: 'CVSS',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 80,
    filterable: false,
    sortable: false
  },
  {
    field: 'status',
    headerName: 'Status',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
    filterOperators: [statusDropdownOperator],
    sortable: false
  },
  {
    field: 'kaiStatus',
    headerName: 'Kai Status',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 120,
    filterOperators: [kaiStatusDropdownOperator],
    sortable: false
  },
  {
    field: 'published',
    headerName: 'Published',
    headerAlign: 'right',
    align: 'right',
    flex: 1,
    minWidth: 100,
    filterable: false,
  },
  {
    field: 'fixDate',
    headerName: 'Fix Date',
    flex: 1,
    minWidth: 150,
    filterable: false
  },
];

export interface VulnGridRow {
  id: number;
  cve: string;
  severity: string;
  status: string;
  cvss: string;
  kaiStatus: string | null;
  published: string;
  fixDate: string;
}

// Convert backend data to DataGrid rows
export const mapVulnDataToRows = (vulnData: VulnTableItem[]): VulnGridRow[] => {
  console.log("Checking if data is empty:", vulnData)
  return vulnData.map((v) => ({
    id: v.id,
    cve: v.cve,
    severity: v.severity,
    status: v.status,
    cvss: v.cvss,
    kaiStatus: v.kaistatus,
    published: v.published ? dayjs(v.published).format('MMM YYYY') : '',
    fixDate: v.fixdate ? dayjs(v.fixdate).format('MMM YYYY') : '',
  }));
};