import React, { useState } from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import ProfileImage from 'assets/profile.jpeg';
import ProfilePictureUpload from 'components/uploadProfilePicture';
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

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
          <IconButton onClick={handleClick}>
            <SettingsOutlined />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <MenuItem>
              <ProfilePictureUpload />
              {/* Include the ProfilePictureUpload component here */}
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Button onClick={handleClick}>
            <Box
              component='img'
              alt='profile'
              src={ProfileImage}
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
            <ArrowDropDownOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
            />
          </Button>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
