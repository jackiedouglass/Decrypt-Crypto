import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({}));

const CoinListToolbar = (props) => {
  const classes = useStyles();

  const handleSearch = (word) => {
    props.setSearch(word.toLowerCase().replace('-', ''));
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid container item sm={8} xs={8} md={8} lg={8}>
              <TextField
                className={classes.textField}
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
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </Grid>
            <Grid container item sm={4} xs={4} md={4} lg={4}>
              <Button
                color="primary"
                component="a"
                variant="contained"
                fullWidth
                onClick={() => {
                  if (props.newCoinId.id !== 'first') {
                    props.openAddCoinModal(true);
                  }
                }}
                className={classes.addCoinBtn}
              >
                Add New Coin
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoinListToolbar;
