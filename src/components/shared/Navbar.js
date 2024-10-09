import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/slices/authSlice';
import { clearReportData } from '../../redux/slices/reportSlice';
import {clearAiReportData} from '../../redux/slices/aiReportSlice'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    dispatch(clearReportData());
    dispatch(clearAiReportData());
    navigate('/login');
    handleMenuClose(); // Close the menu after logging out
  };

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 600); // Adjust the breakpoint as needed
  };

  useEffect(() => {
    checkScreenSize(); // Check screen size on component mount
    window.addEventListener('resize', checkScreenSize); // Add event listener for window resize

    return () => {
      window.removeEventListener('resize', checkScreenSize); // Clean up the event listener
    };
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Daily Expense Tracker
        </Typography>
        {isSmallScreen ? (
          <IconButton color="inherit" onClick={handleMenuClick}>
            <Avatar />
          </IconButton>
        ) : (
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Welcome {user?.fullName}
          </Typography>
        )}
        <Button color="inherit" onClick={() => navigate('/dashboard')}>
          Dashboard
        </Button>


        {!isSmallScreen && <IconButton color="inherit" onClick={handleMenuClick}>
          <Avatar />
        </IconButton>}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {isSmallScreen ? (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          ) : (
            <>
              <MenuItem disabled>{`Welcome ${user?.fullName}`}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
