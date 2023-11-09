import { FormEvent, useState } from 'react';
import {
  AppBar as AppBarMaterial,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { Search, SearchIconWrapper, StyledInputBase } from './styles';
import { useFetchQuote } from '../../services/fetchQuote';

export default function AppBar() {
  const [searchValue, setSearchValue] = useState('');
  const fetchQuote = useFetchQuote();
  function handleSearchSubmit(event: FormEvent) {
    event.preventDefault();
    fetchQuote(searchValue).then(() => setSearchValue(''));
  }

  return (
    <Box>
      <AppBarMaterial position="relative">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            TESTE HEVELLYN ALPHA
          </Typography>
          <form onSubmit={handleSearchSubmit}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={(event) =>
                  setSearchValue(event.target.value.toUpperCase())
                }
              />
            </Search>
          </form>
        </Toolbar>
      </AppBarMaterial>
    </Box>
  );
}
