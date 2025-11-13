import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/searchSlice';
import type { RootState, AppDispatch } from '../store/store';

const SearchBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);

  const handleSearch = () => {
    console.log('Searching for:', query);
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      size="small"
      
      sx={{
        minWidth: '300px',
        "& .MuiInputBase-root": {
          height: 40,
          borderRadius: 1,
        },
        "& .MuiInputBase-input": {
          fontSize: "12px",
        },
        "& .MuiInputBase-input::placeholder": {
          fontSize: "12px",
        },
      }}
      value={query}
      onChange={(e) => {
        console.log(e.target.value)
        dispatch(setSearchQuery(e.target.value))
      }}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton edge="start">
              <SearchIcon sx={{ color: "grey.500" }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
