import { Box, Typography } from "@mui/material";
import VulnerabilityGaugeComparison from "../components/VulnerabilityComparision";
import VulnerabilityBox from "../components/compareCard";
import type { GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import CustomBarChart from "../components/CustomBarChart";
import ChartUserByCountry from "../components/customPiChart";
import VulnerabilitySeverityPieChart from "../components/customPiChart";

// const selectedIdsArray: GridRowId[] = selectedRows.map(row => row.id);
// const selectedIdsSet: Set<GridRowId> = new Set(selectedIdsArray);
// const selectionModel: GridRowSelectionModel = {
//   type: 'include',
//   ids: selectedIdsSet
// };
function Comparison() {
  const selectedRows = useSelector((state: RootState) => state.selectedRows.rows);
   const getColor = (score: number) => {
    if (score >= 9) return "rgba(244, 54, 54, 0.5)";
    if (score >= 7) return "rgba(244, 231, 54, 0.5)";
    return "rgba(57, 244, 54, 0.5)";
  };
  const chartData = selectedRows.map((vuln) => ({
    factorname: vuln.cve,
    frequency: typeof vuln.cvss === "string" ? parseFloat(vuln.cvss) : vuln.cvss,
  }));
  const vulnerabilities = selectedRows.map((v) => ({
    cve: v.cve,
    score: parseFloat(v.cvss),
    color: getColor(parseFloat(v.cvss)),
  }));
  console.log(selectedRows)
  const sampleVuln = {
    cve: "CVE-2025-1234",
    severity: 'critical',
    cvss: 9.8,
    status: "Open",
    kaiStatus: "Under Review",
    published: "2025-01-15",
    fixed: "2025-02-10",
  };
  return (
    <Box sx={{
      display:'block',
      width: '100%',
      minHeight:'100vh',
      alignItems:'start',
    }}>
      <Box sx={{
        width:'100%',
        display: 'flex', 
        alignItems: 'start', 
        gap: 2, 
        p: 2,
      }}>
        <Typography variant="h4">
          Compare multiple vulnerabilities
        </Typography>
      </Box>
      <Box sx={{
        display:'flex',
        flexDirection:'row',
        alignItems:'start',
        width: 'auto',
        gap:2
      }}>
        <Box sx={{
          flex: 4,
          p:'15px',
          display:'grid',
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:2,
        }}>
          {selectedRows.map((vuln) => (
            <VulnerabilityBox
              key={vuln.id}
              vuln={{
                cve: vuln.cve,
                severity: vuln.severity,
                cvss: typeof vuln.cvss === "string" ? parseFloat(vuln.cvss) : vuln.cvss,
                status: vuln.status,
                kaiStatus: vuln.kaiStatus ?? "N/A",
                published: vuln.published,
                fixed: vuln.fixDate ?? "N/A",
              }}
            />
          ))}
        </Box>
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap:2
        }}>
          {selectedRows.length<=5?<VulnerabilityGaugeComparison vulnerabilities={vulnerabilities} />:<></> }
          <VulnerabilitySeverityPieChart selectedRows={selectedRows}/>
          
        </Box>
      </Box>
    </Box>
  );
}

export default Comparison;
