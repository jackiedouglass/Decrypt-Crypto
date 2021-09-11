import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { Box, Container } from '@material-ui/core';
import CoinListResults from 'src/components/coinPrices/CoinListResults';
import CoinListToolbar from 'src/components/coinPrices/CoinListToolbar';
import coins from '../__mocks__/coins';
import AddCoin from 'src/components/modals/AddCoin';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

// url for all coins: `https://www.worldcoinindex.com/apiservice/v2getmarkets?key=${process.env.WORLD_COIN_INDEX_KEY}&fiat=btc`
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

const CoinList = (props) => {
  const [subsetCoinList, setCoinList] = useState([]);
  const [fullCoinList, setFullCoinList] = useState([]);
  const [newCoinId, setCoinId] = useState({
    id: 'first',
    coinInfo: { name: 'first', currentPrice: 3218.26165732303 }
  });
  const [addCoinModal, openAddCoinModal] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const newCoinList = [];
    if (search === '') {
      setCoinList(fullCoinList);
      return;
    }
    for (let i = 0; i < fullCoinList.length; i += 1) {
      if (
        fullCoinList[i].name
          .replace('-', '')
          .slice(0, search.length)
          .toLowerCase() === search
      ) {
        if (!newCoinList.includes(fullCoinList[i])) {
          newCoinList.push(fullCoinList[i]);
        }
      }
    }
    setCoinList(newCoinList);
  }, [search]);

  useEffect(() => {
    fetch(
      `https://www.worldcoinindex.com/apiservice/v2getmarkets?key=WWvvkCc3xGH7Qy1bbS9ejZEp0WsCebuvSiW&fiat=usd`
    )
      .then((res) => res.json())
      .then((data) => {
        const mappedCoins = data.Markets[0].map((coinObj, i) => {
          return {
            name: coinObj.Name,
            currentPrice: coinObj.Price,
            label: coinObj.Label,
            volume: coinObj.Volume_24h
          };
        });

        mappedCoins.sort((coin1, coin2) => coin2.volume - coin1.volume);
        setFullCoinList(mappedCoins);
        setCoinList(mappedCoins);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Add Coin | Decrypt Crypto</title>
      </Helmet>
      {newCoinId.id !== 'first' ? (
        <AddCoin
          addCoinModal={addCoinModal}
          openAddCoinModal={openAddCoinModal}
          email={props.email}
          addCoin={props.addCoin}
          newCoinId={newCoinId}
          coinList={props.coinList}
        />
      ) : null}

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CoinListToolbar
            openAddCoinModal={openAddCoinModal}
            newCoinId={newCoinId}
            setSearch={setSearch}
            search={search}
          />
          <Box sx={{ pt: 3 }}>
            <CoinListResults
              coins={subsetCoinList}
              coinList={subsetCoinList}
              setCoinId={setCoinId}
              search={search}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinList);
