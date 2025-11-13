import { Box } from "@mui/material";
import SideNav from "./components/SideNavBar";
import AppRoutes from "./routes/appRoutes";

function App() {
  return (
    <Box sx={{ 
      display: 'flex',
      minWidth: '100vw',
      minHeight:'100vh',
      background: 'black'
    }}>
      <SideNav />
      <Box sx={{ 
        p: 2, width:'100%', minHeight:'100vh'
      }}>
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default App;
