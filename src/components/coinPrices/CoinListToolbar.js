import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap'
  // },
  // formControl: {
  //   width: '60%'
  // },
  textField: {
    width: '60%'
  },
  addCoinBtn: {
    width: '40%'
  }
}));

const CoinListToolbar = (props) => {
  const classes = useStyles();
  return (
    <Box {...props}>
      <Box sx={{ mt: 8 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 600 }}>
              <TextField
                className={classes.textField}
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
              <Button
                color="primary"
                component="a"
                variant="contained"
                onClick={() => {
                  if (props.newCoinId.id !== 'first') {
                    props.openAddCoinModal(true);
                  }
                }}
                className={classes.addCoinBtn}
              >
                Add New Coin
              </Button>
            </Box>
            <Box sx={{ maxWidth: 300 }}></Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CoinListToolbar;
