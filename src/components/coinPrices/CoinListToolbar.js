import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const CoinListToolbar = (props) => (
  <Box {...props}>
    <Box sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 600 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search"
              variant="outlined"
            />
          </Box>
          <Box sx={{ maxWidth: 300 }}>
            <Button
              color="primary"
              component="a"
              variant="contained"
              onClick={() => {
                if (props.newCoinId.id !== 'first') {
                  props.openAddCoinModal(true);
                }
              }}
              // className={classes.addCoinBtn}
            >
              Add New Coin
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CoinListToolbar;
