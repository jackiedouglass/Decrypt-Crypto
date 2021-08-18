import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { Box, Container } from '@material-ui/core';
import CoinListResults from 'src/components/coinPrices/CoinListResults';
import CoinListToolbar from 'src/components/coinPrices/CoinListToolbar';
import coins from '../__mocks__/coins';

// url for all coins: `https://www.worldcoinindex.com/apiservice/v2getmarkets?key=${process.env.WORLD_COIN_INDEX_KEY}&fiat=btc`

const CoinList = () => {
  const [coinList, setCoinList] = useState([]);

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
            label: coinObj.Label
          };
        });
        setCoinList(mappedCoins);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Coin Prices | Decrypt Crypto</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CoinListToolbar />
          <Box sx={{ pt: 3 }}>
            <CoinListResults coins={coins} coinList={coinList} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CoinList;
