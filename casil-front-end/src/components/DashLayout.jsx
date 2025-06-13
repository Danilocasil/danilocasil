import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Divider,
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';


const drawerWidth = 220;

const DashLayout = () => {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({ name: '', profilePic: '' }); 
  const location = useLocation();
  const navigate = useNavigate();

  // Get the registered user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser({
        name: storedUser.name,
        profilePic: storedUser.profilePic || '' 
      });
    }
  }, []);

  const getPageTitle = (pathname) => {
    if (pathname.includes('/dashboard/users')) return 'Users';
    if (pathname.includes('/dashboard/reports')) return 'Reports';
    return 'Dashboard';
  };

  const toggleDrawer = () => setOpen(!open);
  const handleLogout = () => {
    // Remove user data from localStorage and redirect to login page
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {getPageTitle(location.pathname)}
            </Typography>
          </Box>

          {  }
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {  }
            <Avatar 
              alt="User Profile" 
              src={user.profilePic || ''}
              onError={(e) => { e.target.onerror = null; e.target.src = ''; }}
              sx={{ width: 30, height: 30, mr: 2 }} 
            />
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user.name}
            </Typography>
            {/* Logout Button */}
            <Button 
              color="inherit" 
              onClick={handleLogout} 
              sx={{ textTransform: 'none', '&:hover': { backgroundColor: '#A2C8FF' } }} 
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard/users">
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard/reports">
              <ListItemIcon><AssessmentIcon /></ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </ListItem>
           <ListItem disablePadding>
            <ListItemButton component={Link} to="/dashboard/dashArticles">
              <ListItemIcon><ArticleIcon /></ListItemIcon>
              <ListItemText primary="Articles" />
            </ListItemButton>
          </ListItem>
          
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;
