import React from 'react';
import { Search } from '@mui/icons-material';
import { IconButton, TextField, InputAdornment, useTheme } from '@mui/material';
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

const DataGridCustomToolbar = ({ setSearch, setSearchInput, searchInput }) => {
  const theme = useTheme();
  return (
    <GridToolbarContainer>
      <FlexBetween width='100%'>
        <FlexBetween>
          <GridToolbarDensitySelector
            sx={{ color: theme.palette.secondary[100] }}
          />
          <GridToolbarColumnsButton
            sx={{ color: theme.palette.secondary[100] }}
          />
          <GridToolbarExport sx={{ color: theme.palette.secondary[100] }} />
        </FlexBetween>
        <TextField
          label='Search...'
          sx={{
            mb: '0.5rem',
            width: '15rem',
          }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant='standard'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput('');
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
