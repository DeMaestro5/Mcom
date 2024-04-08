import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  useTheme,
  Button,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from 'state';

// 66028af139178aa548bc6eb1

const Login = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/login', {
        email: email,
        password: password,
      });
      dispatch(setUserId(response.data.user._id));

      navigate('/Dashboard');
      return response;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box m='1.5rem 2.5rem' display={isNonMediumScreens ? 'flex' : 'block'}>
      <Box flex='1' marginTop='150px'>
        <Typography
          variant='h1'
          fontSize='150px'
          fontWeight='bold'
          sx={{ color: theme.palette.secondary[300], fontStyle: 'italic' }}
        >
          Mcom
        </Typography>
        <Typography
          variant='h6'
          fontSize='20px'
          sx={{
            color: theme.palette.primary[100],
            textAlign: 'left',
            lineHeight: '2.5rem',
            maxWidth: '500px',
          }}
        >
          Your streamlined admin dashboard for enhanced productivity. With its
          sleek interface, Mcom empowers admins to manage tasks, analyze data,
          and make informed decisions with ease.
        </Typography>
      </Box>
      <Box
        flex='1'
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{
          padding: '20px',
          backgroundColor: '',
          borderRadius: '20px',
          height: '350px',
          marginTop: '150px',
        }}
      >
        <Box
          width='100%'
          display='flex'
          flexDirection='column'
          alignItems='center'
          maxWidth='300px'
        >
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px' }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label='Password'
            type={showPassword ? 'text' : 'password'}
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px' }}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant='contained'
            color='primary'
            size='large'
            fullWidth
            sx={{ marginBottom: '20px' }}
            onClick={handleSubmit}
          >
            Log In
          </Button>
          <Typography
            variant='body1'
            sx={{ cursor: 'pointer', marginTop: '1rem' }}
          >
            Forgot Password?
          </Typography>
          <Button
            variant='outlined'
            color='primary'
            size='large'
            fullWidth
            sx={{ marginTop: '2rem' }}
            onClick={() => {
              navigate('/register');
            }}
          >
            Create A New Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
