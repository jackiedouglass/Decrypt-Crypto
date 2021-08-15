import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
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
import * as actions from '../actions/actions';

const useStyles = makeStyles((theme) => ({
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center'
  // },
  // logoImg: {
  //   width: '410px'
  // },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main
  // },
  // form: {
  //   width: '100%', // Fix IE 11 issue.
  //   marginTop: theme.spacing(1)
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  //   backgroundColor: '#2A3C4A',
  //   color: '#FFFFFF'
  // },
  // pageText: {
  //   color: '#2A3C4A'
  // }
}));

const mapStateToProps = (state) => ({
  quantityPopup: state.coins.quantityPopup,
  popupWindow: state.coins.popup,
  coinList: state.coins.coinList,
  cashedOutAmnt: state.coins.cashedOutAmnt,
  username: state.coins.username
});

const mapDispatchToProps = (dispatch) => ({
  togglePopup: () => dispatch(actions.togglePopupActionCreator()),
  addCoin: (coinObj) => dispatch(actions.addCoinActionCreator(coinObj)),
  refreshProfits: (coinObj) =>
    dispatch(actions.refreshProfitsActionCreator(coinObj)),
  toggleQuantityPopup: (coinCode) =>
    dispatch(actions.toggleQuantityPopupActionCreator(coinCode)),
  soldQuantity: (coinObj) =>
    dispatch(actions.soldQuantityActionCreator(coinObj)),
  buyMore: (coinObj) => dispatch(actions.buyMoreActionCreator(coinObj)),
  showChart: (coinCode) => dispatch(actions.chartPopupActionCreator(coinCode)),
  addChart: (chartData, coinCode) =>
    dispatch(actions.addChartActionCreator(chartData, coinCode)),
  updateUserInfo: (userData) =>
    dispatch(actions.updateUserInfoActionCreator(userData))
});

const Dashboard = (props) => {
  const classes = useStyles();
  const [addCoinModal, openAddCoinModal] = useState(true);
  let totalInvested = 0;
  let portfolioBalance = 0;

  for (let i = 0; i < props.coinList.length; i += 1) {
    const currCoin = props.coinList[i];
    totalInvested += Number(currCoin.totalCoinInvested);
    portfolioBalance += Number(currCoin.coinBalance);
  }
  return (
    <>
      <Helmet>
        <title>Dashboard | Decrypt Crypto</title>
      </Helmet>
      <AddCoin
        addCoinModal={addCoinModal}
        openAddCoinModal={openAddCoinModal}
        username={props.username}
        addCoin={props.addCoin}
      />
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

            <Grid item lg={8} md={12} xl={9} xs={12}>
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
