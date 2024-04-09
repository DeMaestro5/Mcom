import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const Logout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const handleLogout = () => {
      // Clear any user authentication data
      localStorage.removeItem('accessToken');
      localStorage.setItem('loggedOut', 'true');

      // Clear browser history and redirect to login page
      window.history.pushState({}, '', '/login');
      navigate('/login');
    };

    return handleLogout;
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '10px',
      }}
    >
      <Button
        onClick={handleOpen}
        style={{ color: 'red', marginRight: '50px' }}
      >
        Logout
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { width: '400px', height: '200px' } }}
      >
        <DialogTitle style={{ backgroundColor: 'grey' }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent style={{ backgroundColor: 'grey' }}>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: 'grey' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus style={{ color: 'red' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Logout;
