import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Role({ role, setRole }) {
  const handleRoleChange = (event) => {
    const value = event.target.value;
    if (value === 'custom') {
      setRole('');
    } else {
      setRole(value);
    }
  };

  return (
    <div>
      <FormControl fullWidth variant='outlined' sx={{ marginBottom: '20px' }}>
        <InputLabel id='role-label'>Role</InputLabel>
        <Select
          labelId='role-label'
          value={role}
          onChange={handleRoleChange}
          label='Role'
          sx={{ width: '400px' }} // Set width to 100%
        >
          <MenuItem value=''>Select Role</MenuItem>
          <MenuItem value='User'>User</MenuItem>
          <MenuItem value='Admin'>Admin</MenuItem>
          <MenuItem value='SuperAdmin'>SuperAdmin</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Role;
