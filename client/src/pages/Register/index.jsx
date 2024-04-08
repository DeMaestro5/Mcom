import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  useTheme,
  Button,
  InputAdornment,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordAgain,
} from '../../validation';
import Role from 'components/role';
import CountriesList from 'components/CountriesList';
import Possibility from 'assets/possibility.png';

const Register = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [passwordAgain, setPasswordAgain] = useState('');
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [occupation, setOccupation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateName(name)) {
      alert('Please enter a valid name');
      return;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email');
      return;
    }
    if (!validatePassword(password)) {
      alert('Please enter a valid password');
      return;
    }
    if (!validatePasswordAgain(passwordAgain)) {
      alert('Password Again field must not be empty');
      return;
    }
    if (password !== passwordAgain) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4001/register', {
        name,
        email,
        password,
        city,
        state,
        country,
        occupation,
        phoneNumber,
        role,
      });
      navigate('/login');
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePasswordAgainVisibility = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };
  return (
    <Box m='1.5rem 2.5rem' display={isNonMediumScreens ? 'flex' : 'block'}>
      <Box flex='1'>
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
        {isNonMediumScreens && (
          <img
            src={Possibility}
            alt='logo'
            style={{
              borderRadius: '5px',
              width: '500px',
              height: '500px',
            }}
          />
        )}
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
          // border: '1px solid white',
          height: '950px',
          // marginTop: '150px',
        }}
      >
        <Box
          width='100%'
          display='flex'
          flexDirection='column'
          alignItems='center'
          maxWidth='400px'
        >
          <TextField
            label='Name'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px' }}
            onChange={(e) => setName(e.target.value)}
          />
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
          <TextField
            label='Confirm Password'
            type={showPasswordAgain ? 'text' : 'password'}
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px' }}
            onChange={(e) => setPasswordAgain(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleTogglePasswordAgainVisibility}
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {showPasswordAgain ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label='City'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px' }}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            label='State'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px' }}
            onChange={(e) => setState(e.target.value)}
          />
          <CountriesList country={country} setCountry={setCountry} />
          <TextField
            label='Occupation'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px' }}
            onChange={(e) => setOccupation(e.target.value)}
          />
          <TextField
            label='Phone Number'
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '20px' }}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Role role={role} setRole={setRole} />

          <Box marginTop='1rem'>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Box>
          <Box marginTop='1rem'>
            <Button
              variant='outlined'
              color='primary'
              size='large'
              onClick={() => {
                navigate('/login');
              }}
            >
              Log Into your Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
