import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, 
  ListItemText, CssBaseline, Box, IconButton, Avatar, Divider, 
  ListItemButton, Tooltip, Menu, MenuItem
} from "@mui/material";
import { 
  Menu as MenuIcon, Dashboard, ExitToApp, Storefront
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 260;

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // User Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/" },
   
  ];

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: '#fff', color: '#2D3436' }}>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
        color: '#E91E63',
        gap: 1
      }}>
        <Storefront sx={{ fontSize: 28 }} />
        <Typography variant="h6" fontWeight="800" sx={{ letterSpacing: 0.5 }}>
          SWEET SHOP
        </Typography>
      </Toolbar>
      <Divider />

      {/* Navigation Links */}
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => {
           const isActive = location.pathname === item.path;
           return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                onClick={() => navigate(item.path)}
                selected={isActive}
                sx={{
                  borderRadius: 3, 
                  py: 1.5,
                  transition: 'all 0.3s ease',
               
                  bgcolor: isActive ? '#FFF0F5' : 'transparent',
                  color: isActive ? '#E91E63' : 'inherit',
                  '&:hover': {
                    bgcolor: '#FFF0F5',
                    transform: 'translateX(5px)', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  },
                  '&.Mui-selected': {
                    bgcolor: '#FFF0F5',
                    color: '#E91E63',
                    '&:hover': { bgcolor: '#FEE0E9' }
                  }
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#E91E63' : '#9E9E9E', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }}
                />
              </ListItemButton>
            </ListItem>
           );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      

      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          width: { sm: `calc(100% - ${drawerWidth}px)` }, 
          ml: { sm: `${drawerWidth}px` },
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          color: "#2D3436"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700, color: '#E91E63' }}>
            Dashboard
          </Typography>
          
          {/* User Profile Area */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {user?.username}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: '#E91E63', 
                fontWeight: 700, 
                bgcolor: '#FFF0F5', 
                px: 1, py: 0.3, 
                borderRadius: 4 
              }}>
                {user?.role}
              </Typography>
            </Box>

            <Tooltip title="Account Settings">
              <IconButton onClick={handleMenuOpen} sx={{ p: 0.5, border: '2px solid #FFF0F5' }}>
                <Avatar sx={{ bgcolor: '#E91E63', fontWeight: 'bold' }}>
                  {user?.username?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* User Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                elevation: 4,
                sx: { 
                  mt: 1.5, 
                  borderRadius: 3, 
                  minWidth: 180,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  '&:before': { 
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem disabled sx={{ opacity: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Signed in as <b>{user?.username}</b>
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main', fontWeight: 600 }}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" color="error" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Container */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, border: 'none' } }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, borderRight: 'none', bgcolor: '#F9FAFB' } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, bgcolor: "#FFF0F5", minHeight: "100vh" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;