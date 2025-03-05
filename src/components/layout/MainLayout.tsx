import React from 'react';
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin', 'padding'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
  ...(open && {
    transition: theme.transitions.create(['margin', 'padding'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [open, setOpen] = React.useState(window.innerWidth > 1200);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200 && open) {
        setOpen(false);
      } else if (window.innerWidth > 1200 && !open) {
        setOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CRM系统
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={window.innerWidth > 1200 ? "persistent" : "temporary"}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#1a1f2c',
            color: '#fff',
            '& .MuiListItem-root': {
              margin: '4px 8px',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(33, 150, 243, 0.16)',
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.24)'
                }
              }
            },
            '& .MuiListItemIcon-root': {
              color: 'inherit',
              minWidth: 40
            }
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <List>
            <ListItem
              button
              selected={location.pathname === '/'}
              onClick={() => navigate('/')}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="仪表盘" />
            </ListItem>
            <ListItem
              button
              selected={location.pathname.startsWith('/customers')}
              onClick={() => navigate('/customers')}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="客户管理" />
            </ListItem>
            <ListItem
              button
              selected={location.pathname.startsWith('/sales')}
              onClick={() => navigate('/sales')}
            >
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary="销售管理" />
            </ListItem>
            <ListItem
              button
              selected={location.pathname.startsWith('/tasks')}
              onClick={() => navigate('/tasks')}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="任务管理" />
            </ListItem>
            <ListItem
              button
              selected={location.pathname.startsWith('/reports')}
              onClick={() => navigate('/reports')}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="报告生成" />
            </ListItem>
            <ListItem
              button
              selected={location.pathname.startsWith('/knowledgebase')}
              onClick={() => navigate('/knowledgebase')}
            >
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="知识库" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        {children}
      </Main>
    </Box>
  );
};

export default MainLayout;