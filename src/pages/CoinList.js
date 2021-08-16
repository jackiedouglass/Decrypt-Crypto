import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CoinListResults from 'src/components/coinPrices/CoinListResults';
import CoinListToolbar from 'src/components/coinPrices/CoinListToolbar';
import coins from 'src/__mocks__/coins';

const CoinList = () => (
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
          <CoinListResults coins={coins} />
        </Box>
      </Container>
    </Box>
  </>
);

export default CoinList;
