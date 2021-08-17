import PropTypes from 'prop-types';
import { useState } from 'react';
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
import { makeStyles } from '@material-ui/styles';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ShowChart from '../modals/ShowChart';
import ChangeQuantity from '../modals/ChangeQuantity';

const useStyles = makeStyles((theme) => ({
  chartDisplay: { minWidth: '800px' }
}));

const CoinCard = (props) => {
  const classes = useStyles();
  const [chart, showChart] = useState(false);
  const [changeQuantity, showQuantityModal] = useState(false);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {chart && (
        <ShowChart
          chart={chart}
          showChart={showChart}
          coinInfo={props.coinInfo}
          searchId={props.searchId}
          className={classes.chartDisplay}
        />
      )}
      {changeQuantity && (
        <ChangeQuantity
          changeQuantity={changeQuantity}
          showQuantityModal={showQuantityModal}
          coinInfo={props.coinInfo}
          searchId={props.searchId}
          className={classes.chartDisplay}
          email={props.email}
          fullList={props.fullList}
          buyMore={props.buyMore}
          soldQuantity={props.soldQuantity}
          cashedOutAmnt={props.cashedOutAmnt}
        />
      )}
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        ></Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
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
            <Button
              onClick={() => {
                showChart(true);
              }}
            >
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
            <Button
              onClick={() => {
                showQuantityModal(true);
                console.log(changeQuantity);
              }}
            >
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
};

export default CoinCard;
