import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  type Theme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ListAlt as ListAltIcon,
  Archive as PackagesIcon,
  CompareArrows as CompareIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  path: string;
}

const iconSize = 18;

const coreNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: iconSize }} />, path: '/dashboard' },
];

const analysisNavItems: NavItem[] = [
  { id: 'comparison', label: 'Comparison Tool', icon: <CompareIcon sx={{ fontSize: iconSize }} />, path: '/compare' },
];

const drawerWidth = '14vw';

const SideNav: React.FC = () => {
  const theme: Theme = useTheme();
  const [activePath, setActivePath] = React.useState<string>('/');
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setActivePath(path);
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  const NavGroup = ({
    items,
    title,
    fontSize = 14,
    titleFontSize = 12,
  }: {
    items: NavItem[];
    title?: string;
    fontSize?: number;
    titleFontSize?: number;
  }) => (
    <List disablePadding>
      {title && (
        <Typography
          variant="overline"
          sx={{
            mt: 2,
            mb: 0.5,
            ml: 2,
            color: theme.palette.text.secondary,
            fontSize: titleFontSize,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          {title}
        </Typography>
      )}
      {items.map((item) => (
        <ListItem key={item.id} disablePadding sx={{ 
          display: 'block',
          px: '10px'
        }}>
          <ListItemButton
            onClick={() => {
              handleNavigation(item.path)
            }}
            sx={{
              minHeight: 40,
              justifyContent: 'initial',
              px: 1.5,
              py: 0,
              borderRadius: '10px',
              backgroundColor:
                activePath === item.path
                  ? theme.palette.action.selected
                  : 'transparent',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 2.5,
                borderRadius:10,
                justifyContent: 'center',
                color:
                  activePath === item.path
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize,
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          minHeight: '64px',
          borderRadius: '20px'
        }}
      >
        <Typography variant="h5" color="primary" fontWeight={700}>
          Kai Watch
        </Typography>
      </Box>


      <NavGroup items={coreNavItems} title="Core Views" fontSize={12} titleFontSize={11} />

      <Divider sx={{ my: 1 }} />

      <NavGroup items={analysisNavItems} title="Analysis & Tools" fontSize={12} titleFontSize={11} />

      <Divider sx={{ my: 1 }} />
    </Drawer>
  );
};

export default SideNav;
