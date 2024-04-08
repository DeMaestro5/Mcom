import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { countries } from 'countries-list';

function CountriesList() {
  const [country, setCountry] = useState('');
  const handleCountryChange = (event) => {
    const value = event.target.value;
    if (value === 'custom') {
      setCountry('');
    } else {
      setCountry(value);
    }
  };

  const countryOptions = Object.keys(countries).map((countryCode) => ({
    code: countryCode,
    name: countries[countryCode].name,
  }));

  return (
    <div>
      <FormControl fullWidth variant='outlined' sx={{ marginBottom: '20px' }}>
        <InputLabel id='country-label'>Country</InputLabel>
        <Select
          labelId='country-label'
          value={country}
          onChange={handleCountryChange}
          label='Country'
          sx={{ width: '400px' }}
        >
          <MenuItem value=''>Select Country</MenuItem>
          {countryOptions.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              {country.name}
            </MenuItem>
          ))}
          <MenuItem value='custom'>Custom</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default CountriesList;
