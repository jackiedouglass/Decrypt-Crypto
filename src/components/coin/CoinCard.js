import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ShowChartIcon from '@material-ui/icons/ShowChart';

const CoinCard = (props) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        {/* <Avatar alt="Product" src={product.media} variant="square" /> */}
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h3">
        {props.coinInfo.name}
      </Typography>
      <br />
      <Typography align="left" color="textPrimary" variant="body1">
        <big>
          <strong>Quantity Held: </strong>
        </big>
        {props.coinInfo.coinQuantity.toFixed(4)}
      </Typography>
      <Typography align="left" color="textPrimary" variant="body1">
        <big>
          <strong>Current Price: </strong>
        </big>
        ${props.coinInfo.currPrice.toFixed(4)}
      </Typography>
      <Typography align="left" color="textPrimary" variant="body1">
        <big>
          <strong>Total Coin Value: </strong>
        </big>
        ${props.coinInfo.coinBalance.toFixed(4)}
      </Typography>
      <Typography align="left" color="textPrimary" variant="body1">
        <big>
          <strong>Amount Invested in: </strong>
        </big>
        ${props.coinInfo.totalCoinInvested.toFixed(4)}
      </Typography>
      <Typography align="left" color="textPrimary" variant="body1">
        <big>
          <strong>Total Coin Profit: </strong>
        </big>
        ${props.coinInfo.coinProfit.toFixed(4)}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Button>
            <ShowChartIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              Price History
            </Typography>
          </Button>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Button>
            <AccountBalanceIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              Update Quantity
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

export default CoinCard;
