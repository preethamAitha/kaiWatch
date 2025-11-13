import { Box, Typography, Chip } from "@mui/material";

interface Vulnerability {
  cve: string;
  severity: "critical" | "high" | "medium" | "low"| string;
  cvss: number;
  status: string;
  kaiStatus: string;
  published: string;
  fixed: string;
}

interface VulnerabilityBoxProps {
  vuln: Vulnerability;
  borderColor?: string;
}

const VulnerabilityBox: React.FC<VulnerabilityBoxProps> = ({
  vuln,
}) => {
  const colors: Record<Vulnerability["severity"], string> = {
    critical: "rgba(244, 54, 54, 0.2)",
    high: "rgba(215, 49, 49, 0.2)",
    medium: "rgba(244, 212, 54, 0.2)",
    low: "rgba(57, 244, 54, 0.2)",
  };

  const textColors: Record<Vulnerability["severity"], string> = {
    critical: "rgba(244, 54, 54)",
    high: "rgba(215, 49, 49)",
    medium: "rgba(244, 212, 54)",
    low: "rgba(57, 244, 54)",
  };

  const severity = vuln.severity.toLowerCase() as keyof typeof colors;
  const isFixed = vuln.status.toLowerCase().includes("fixed");    
  return (
    <Box
      sx={{
        border: isFixed ? "1px solid rgba(50, 205, 50)" : "1px solid rgba(255, 99, 71)",
        backgroundColor: !isFixed ? 'rgba(244, 54, 54, 0.1)':'rgba(57, 244, 54, 0.1)',
        borderRadius: 2,
        p: 2,
        width: 280,
        height:'auto',
        maxHeight:'230px',
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {vuln.cve}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip
          label={vuln.severity.toUpperCase()}
          size="small"
          sx={{
            backgroundColor: colors[severity],
            color: textColors[severity],
            fontWeight: 600,
            borderRadius: "6px",
          }}
        />
        <Typography variant="body2" sx={{ color: "#ccc" }}>
          CVSS: {vuln.cvss}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="body2">
          <strong>Status:</strong> {vuln.status}
        </Typography>
        <Typography variant="body2">
          <strong>KAI Status:</strong> {vuln.kaiStatus}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="body2">
          <strong>Published:</strong> {vuln.published}
        </Typography>
        <Typography variant="body2">
          <strong>Fixed:</strong> {vuln.fixed}
        </Typography>
      </Box>
    </Box>
  );
};

export default VulnerabilityBox;
