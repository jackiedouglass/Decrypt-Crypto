import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import TotalInvested from 'src/components/dashboard/TotalInvested';
import LatestOrders from 'src/components/dashboard//LatestOrders';
import LatestProducts from 'src/components/dashboard//LatestProducts';
import Sales from 'src/components/dashboard//Sales';
import CashedOut from 'src/components/dashboard/CashedOut';
import PortfolioBalance from 'src/components/dashboard/PortfolioBalance';
import PortfolioProfits from 'src/components/dashboard/PortfolioProfits';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';
import AddCoin from 'src/components/modals/AddCoin';
import CoinCard from 'src/components/coin/CoinCard';
import * as actions from '../actions/actions';

const useStyles = makeStyles((theme) => ({
  addCoinBtn: {
    width: '200px',
    height: '50px'
  }
}));

const mapStateToProps = (state) => ({
  coinList: state.coins.coinList,
  cashedOutAmnt: state.coins.cashedOutAmnt,
  email: state.coins.email
});

const mapDispatchToProps = (dispatch) => ({
  addCoin: (coinObj) => dispatch(actions.addCoinActionCreator(coinObj)),
  refreshProfits: (coinObj) =>
    dispatch(actions.refreshProfitsActionCreator(coinObj)),
  soldQuantity: (coinObj) =>
    dispatch(actions.soldQuantityActionCreator(coinObj)),
  buyMore: (coinObj) => dispatch(actions.buyMoreActionCreator(coinObj)),
  updateUserInfo: (userData) =>
    dispatch(actions.updateUserInfoActionCreator(userData))
});

const Dashboard = (props) => {
  const classes = useStyles();
  // const [addCoinModal, openAddCoinModal] = useState(false);
  let totalInvested = 0;
  let portfolioBalance = 0;

  function refreshProfits() {
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coinList: props.coinList,
        email: props.email
      })
    };
    fetch(
      'https://3mi5k0hgr1.execute-api.us-east-2.amazonaws.com/dev/refreshprofits',
      reqParams
    )
      .then((response) => response.json())
      .then((data) => {
        props.refreshProfits(data);
      })
      .catch((err) => console.error(err));
  }

  for (let i = 0; i < props.coinList.length; i += 1) {
    const currCoin = props.coinList[i];
    totalInvested += Number(currCoin.totalCoinInvested);
    portfolioBalance += Number(currCoin.coinBalance);
  }

  const coinDisplay = props.coinList.map((coin, i) => {
    const searchId = coin.name.toLowerCase();
    return (
      <Grid item lg={4} sm={6} xl={4} xs={12}>
        <CoinCard
          email={props.email}
          searchId={searchId}
          fullList={props.coinList}
          buyMore={props.buyMore}
          soldQuantity={props.soldQuantity}
          coinInfo={coin}
          cashedOutAmnt={props.cashedOutAmnt}
        />
      </Grid>
    );
  });
  return (
    <>
      <Helmet>
        <title>Dashboard | Decrypt Crypto</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalInvested totalInvested={totalInvested.toFixed(4)} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <PortfolioBalance
                portfolioBalance={portfolioBalance.toFixed(4)}
              />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <PortfolioProfits
                totalProfits={Number(portfolioBalance - totalInvested).toFixed(
                  4
                )}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <CashedOut cashedOutAmnt={props.cashedOutAmnt} />
            </Grid>
          </Grid>
          <br />
          <center>
            <Grid container>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                {/* <Button
                  color="primary"
                  component="a"
                  variant="contained"
                  onClick={() => {
                    openAddCoinModal(true);
                  }}
                  className={classes.addCoinBtn}
                >
                  Add New Coin
                </Button> */}
                {/* {'   '} */}
                <Button
                  color="primary"
                  component="a"
                  variant="contained"
                  onClick={refreshProfits}
                  className={classes.addCoinBtn}
                >
                  Refresh Profits
                </Button>
              </Grid>
            </Grid>
          </center>
          <br />
          <Grid container spacing={3}>
            {coinDisplay}
          </Grid>
          {/* <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficByDevice sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid> */}
        </Container>
      </Box>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
