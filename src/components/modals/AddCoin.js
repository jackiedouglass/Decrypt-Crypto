import Dialog from '@material-ui/core/Dialog';
import { useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    // margin: theme.spacing(1),
    width: '60%'
  },
  textField: {
    // margin: theme.spacing(1),
    width: '60%'
  }
}));

export default function AddCoin({ addCoinModal, openAddCoinModal, username }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [coin, setCoin] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const bodyObj = {
      coin,
      amntPurchased: quantity,
      price,
      username
    };
    console.log(bodyObj);
    // fetch(
    //   'https://3mi5k0hgr1.execute-api.us-east-2.amazonaws.com/dev/addcoin',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(bodyObj)
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // props.addCoin({ ...data, coinCode: bodyObj.coin });
    //     // console.log(props.fullList);
    //     openAddCoinModal(false);
    //   })
    //   .catch((error) => console.log('Error: ', error));
  };
  return (
    <Dialog
      open={addCoinModal}
      onClose={() => {
        openAddCoinModal(false);
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" className={classes.pageText}>
        Add New Coin to Portfolio
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.pageText}>
          Enter the coin you purchased, what price you purchased it at, and how
          much you bought below.
        </DialogContentText>
        {/* {incorrectVerificationCode && (
        <Typography style={{ color: 'red' }}>
          Please double-check you entered in the correct verification code.
        </Typography>
      )} */}
        <br />
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-dialog-select-label">
              Coin Purchased
            </InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={coin}
              onChange={(e) => {
                setCoin(e.target.value);
              }}
              input={<Input />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'ethbtc'}>Ethereum (ETH)</MenuItem>
              <MenuItem value={'btcbtc'}>Bitcoin (BTC)</MenuItem>
              <MenuItem value={'ltcbtc'}>Litecoin (LTC)</MenuItem>
              <MenuItem value={'adabtc'}>Cardano (ADA)</MenuItem>
              <MenuItem value={'dotbtc'}>Polkadot (DOT)</MenuItem>
              <MenuItem value={'bchbtc'}>Bitcoin Cash (bchbtc)</MenuItem>
              <MenuItem value={'xlmbtc'}>Stellar (XLM)</MenuItem>
              <MenuItem value={'linkbtc'}>Chainlink (LINK)</MenuItem>
              <MenuItem value={'bnbbtc'}>Binance Coin (BNB)</MenuItem>
              <MenuItem value={'usdtbtc'}>Tether (USDT)</MenuItem>
              <MenuItem value={'xmrbtc'}>Monero (XMR)</MenuItem>
              <MenuItem value={'usdcbtc'}>USD Coin (USDC)</MenuItem>
              <MenuItem value={'hbarbtc'}>Hedera Hashgraph (HBAR)</MenuItem>
            </Select>
            <br />
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Amount Purchased"
            onChange={handleQuantityChange}
            className={classes.textField}
          />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price Purchased At"
            onChange={handlePriceChange}
            className={classes.textField}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            openAddCoinModal(false);
          }}
          className={classes.submit}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} className={classes.submit}>
          Add Coin to Portfolio
        </Button>
      </DialogActions>
    </Dialog>
  );
}
