import React, { useState, useEffect } from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import {
  AppBar,
  Box,
  Typography,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  useTheme,
} from '@mui/material';
import FirebaseImageUpload from 'firebaseImage/firebaseImageUpload';
import Logout from 'pages/Logout';

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [uploadAnchorEl, setUploadAnchorEl] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    // Check if profile image URL exists in local storage
    const storedImageUrl = localStorage.getItem('profileImageUrl');
    if (storedImageUrl) {
      setProfileImageUrl(storedImageUrl);
    }

    // Event listener to close upload input when clicking outside of it
    const handleClickOutside = (event) => {
      if (!uploadAnchorEl?.contains(event.target)) {
        setUploadAnchorEl(null);
      }
    };

    document.body.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
    };
  }, [uploadAnchorEl]);

  const isMenuOpen = Boolean(menuAnchorEl);
  const isUploadOpen = Boolean(uploadAnchorEl);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setUploadAnchorEl(null); // Close the upload input when clicking on the menu icon
  };

  const handleMenuClose = () => setMenuAnchorEl(null);

  const handleProfilePictureClick = () => {
    setUploadAnchorEl(uploadAnchorEl ? null : document.body);
    setMenuAnchorEl(null); // Close the dropdown menu when clicking on the profile picture
  };

  const handleImageUpload = (imageUrl) => {
    // Save profile image URL to local storage
    localStorage.setItem('profileImageUrl', imageUrl);
    setProfileImageUrl(imageUrl);
    setUploadAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius='9px'
            p='0.1rem 1.5rem'
          >
            <InputBase placeholder='Search' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RightSide */}
        <FlexBetween>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton onClick={handleMenuClick}>
            <SettingsOutlined />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <MenuItem onClick={handleProfilePictureClick}>
              Profile Picture
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>

            <Logout />
          </Menu>
          <Button>
            <Box
              component='img'
              alt='profile'
              src={profileImageUrl}
              height='30px'
              width='30px'
              borderRadius='50%'
              sx={{ objectFit: 'cover' }}
            />
            <Box textAlign='left'>
              <Typography
                fontWeight='bold'
                fontSize='0.85rem'
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user.name}
              </Typography>
              <Typography
                fontSize='0.75rem'
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user.occupation}
              </Typography>
            </Box>
          </Button>
          {/* Show the file input */}
          {isUploadOpen && (
            <div
              ref={(node) => setUploadAnchorEl(node)}
              style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '10px',
                zIndex: 999,
              }}
            >
              <FirebaseImageUpload onImageUpload={handleImageUpload} />
            </div>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
