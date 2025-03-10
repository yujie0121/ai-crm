import React, { useState, useEffect } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton,
  Avatar,
  Badge,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
  useMediaQuery,
  Button,
  Fade
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useAuth } from '../../features/auth/AuthContext';

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
  display: 'flex',
  flexDirection: 'column',
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
  const [open, setOpen] = useState(window.innerWidth > 1200);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { logout } = useAuth();
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  // 响应式设计
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  useEffect(() => {
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
  
  // 处理通知菜单
  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };
  
  // 处理个人资料菜单
  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };
  
  // 处理搜索框显示
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchValue('');
    }
  };
  
  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // 执行搜索逻辑
      console.log('搜索:', searchValue);
    }
  };
  
  // 处理登出
  const handleLogout = () => {
    handleProfileClose();
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)'
      }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="img" src="/enhanced-logo.svg" alt="AI CRM Pro" sx={{ height: 40, mr: 1, display: { xs: 'none', sm: 'block' } }} />
              AI CRM Pro
            </Typography>
          </Box>
          
          {/* 搜索框 */}
          <Fade in={showSearch}>
            <Box 
              component="form" 
              onSubmit={handleSearch}
              sx={{ 
                flexGrow: 1, 
                mx: 2, 
                display: showSearch ? 'block' : 'none',
                position: 'relative'
              }}
            >
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: alpha('#fff', 0.15),
                borderRadius: 2,
                px: 2,
                '&:hover': { backgroundColor: alpha('#fff', 0.25) }
              }}>
                <SearchIcon sx={{ color: 'white', mr: 1 }} />
                <Box
                  component="input"
                  placeholder="搜索客户、销售机会或任务..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  sx={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    py: 1,
                    backgroundColor: 'transparent',
                    '&::placeholder': { color: alpha('#fff', 0.7) }
                  }}
                />
              </Box>
            </Box>
          </Fade>
          
          {/* 右侧工具栏 */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="搜索">
              <IconButton color="inherit" onClick={toggleSearch}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="AI助手">
              <IconButton 
                color="inherit" 
                onClick={() => navigate('/ai-assistant')}
                sx={{ mx: { xs: 0.5, md: 1 } }}
              >
                <SmartToyIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="通知">
              <IconButton 
                color="inherit" 
                onClick={handleNotificationsOpen}
                sx={{ mx: { xs: 0.5, md: 1 } }}
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="个人资料">
              <IconButton 
                onClick={handleProfileOpen}
                sx={{ ml: { xs: 0.5, md: 1 } }}
              >
                <Avatar 
                  alt="用户头像" 
                  src="/avatar.jpg"
                  sx={{ 
                    width: 32, 
                    height: 32,
                    border: '2px solid white'
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* 通知菜单 */}
      <Menu
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleNotificationsClose}
        PaperProps={{
          elevation: 3,
          sx: { width: 320, maxHeight: 400, mt: 1.5, borderRadius: 2 }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight="bold">通知</Typography>
        </Box>
        <List sx={{ p: 0 }}>
          <ListItem button sx={{ py: 1.5 }}>
            <ListItemText 
              primary="新客户注册"
              secondary="张三刚刚注册成为新客户"
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
            <Typography variant="caption" color="text.secondary">5分钟前</Typography>
          </ListItem>
          <Divider />
          <ListItem button sx={{ py: 1.5 }}>
            <ListItemText 
              primary="销售目标达成"
              secondary="您已完成本月销售目标的85%"
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
            <Typography variant="caption" color="text.secondary">1小时前</Typography>
          </ListItem>
          <Divider />
          <ListItem button sx={{ py: 1.5 }}>
            <ListItemText 
              primary="任务到期提醒"
              secondary="您有3个任务即将到期"
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
            <Typography variant="caption" color="text.secondary">昨天</Typography>
          </ListItem>
        </List>
        <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <Button size="small" onClick={handleNotificationsClose}>查看全部通知</Button>
        </Box>
      </Menu>
      
      {/* 个人资料菜单 */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileClose}
        PaperProps={{
          elevation: 3,
          sx: { width: 220, mt: 1.5, borderRadius: 2 }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Avatar 
            alt="用户头像" 
            src="/avatar.jpg"
            sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }}
          />
          <Typography variant="subtitle1" fontWeight="bold">王小明</Typography>
          <Typography variant="body2" color="text.secondary">销售经理</Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => { handleProfileClose(); navigate('/profile'); }}>
          <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
          <ListItemText>个人资料</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { handleProfileClose(); navigate('/settings'); }}>
          <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
          <ListItemText>设置</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { handleProfileClose(); navigate('/help'); }}>
          <ListItemIcon><HelpOutlineIcon fontSize="small" /></ListItemIcon>
          <ListItemText>帮助中心</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><ExitToAppIcon fontSize="small" /></ListItemIcon>
          <ListItemText>退出登录</ListItemText>
        </MenuItem>
      </Menu>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            border: 'none',
            backgroundColor: '#ffffff',
            '& .MuiListItem-root': {
              borderRadius: 2,
              margin: '4px 8px',
              '&.Mui-selected': {
                backgroundColor: '#eff6ff',
                '& .MuiListItemIcon-root': {
                  color: '#2563eb',
                },
                '& .MuiListItemText-primary': {
                  color: '#2563eb',
                  fontWeight: 600,
                }
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
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
        <Box sx={{ px: 2, py: 3 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 2
            }}
          >
            <Box 
              component="img" 
              src="/logo.svg" 
              alt="CRM Logo" 
              sx={{ height: 40, mr: 1 }} 
            />
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              CRM系统
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mx: 2, mb: 2 }} />
        
        <List component="nav" sx={{ px: 1 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              px: 3, 
              py: 1, 
              display: 'block', 
              color: 'text.secondary',
              fontWeight: 'bold'
            }}
          >
            主导航
          </Typography>
          
          <ListItem 
            button 
            selected={location.pathname === '/'} 
            onClick={() => navigate('/')}
            sx={{
              borderRadius: '8px',
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)'
                }
              },
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
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
            sx={{ mb: 0.5 }}
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
            sx={{ mb: 0.5 }}
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
            sx={{ mb: 0.5 }}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="任务管理" />
          </ListItem>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography 
            variant="overline" 
            sx={{ 
              px: 3, 
              py: 1, 
              display: 'block', 
              color: 'text.secondary',
              fontWeight: 'bold'
            }}
          >
            分析与报告
          </Typography>
          
          <ListItem 
            button 
            selected={location.pathname.startsWith('/reports')} 
            onClick={() => navigate('/reports')}
            sx={{ mb: 0.5 }}
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
            sx={{ mb: 0.5 }}
          >
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="知识库" />
          </ListItem>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography 
            variant="overline" 
            sx={{ 
              px: 3, 
              py: 1, 
              display: 'block', 
              color: 'text.secondary',
              fontWeight: 'bold'
            }}
          >
            系统管理
          </Typography>
          
          <ListItem 
            button 
            selected={location.pathname.startsWith('/users')} 
            onClick={() => navigate('/users')}
            sx={{ mb: 0.5 }}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="用户管理" />
          </ListItem>
        </List>
      </Drawer>
      
      <Main open={open}>
        <Toolbar />
        <Box 
          sx={{ 
            p: { xs: 2, sm: 3 },
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: 'background.default',
            borderRadius: 2,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            flex: 1
          }}
        >
          {children}
        </Box>
      </Main>
    </Box>
  );
};

export default MainLayout;