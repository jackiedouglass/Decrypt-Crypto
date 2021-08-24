import Dialog from '@material-ui/core/Dialog';
import { useState, useEffect } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    width: '60%'
  },
  textField: {
    width: '60%'
  }
}));

export default function AddCoin({
  addCoinModal,
  openAddCoinModal,
  email,
  addCoin,
  newCoinId,
  coinList
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [coin, setCoin] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [errorCoin, showErrorCoin] = useState(false);

  useEffect(() => {
    showErrorCoin(false);
    for (let i = 0; i < coinList.length; i += 1) {
      if (coinList[i].name === newCoinId.coinInfo.name) {
        showErrorCoin(true);
      }
    }
  }, [newCoinId]);

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
      coin: newCoinId.id,
      amntPurchased: quantity,
      price,
      email
    };
    if (!errorCoin) {
      fetch(
        'https://3mi5k0hgr1.execute-api.us-east-2.amazonaws.com/dev/addcoin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyObj)
        }
      )
        .then((response) => response.json())
        .then((data) => {
          addCoin({ ...data, coinCode: bodyObj.coin });
          openAddCoinModal(false);
        })
        .catch((error) => console.log('Error: ', error));
    }
  };
  return (
    <Dialog
      open={addCoinModal}
      onClose={() => {
        openAddCoinModal(false);
      }}
      aria-labelledby="form-dialog-title"
    >
      {errorCoin && (
        <DialogContent>
          <DialogContentText style={{ color: 'red' }}>
            {' '}
            You've already added this coin to your portfolio. If you wish to
            update the quantity, please do so on the Dashboard page.
          </DialogContentText>
        </DialogContent>
      )}
      <DialogTitle
        id="form-dialog-title"
        className={classes.pageText}
        variant="h3"
      >
        Add {newCoinId.coinInfo.name} to Portfolio
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.pageText}>
          If necessary, update the price you purchased {newCoinId.coinInfo.name}{' '}
          at, and how much you bought below.
        </DialogContentText>
        <br />
        <form className={classes.container}>
          <TextField
            margin="dense"
            id="quantity"
            label="Amount Purchased"
            onChange={handleQuantityChange}
            className={classes.textField}
          />
          <br />
          <TextField
            margin="dense"
            id="price"
            label="Price Purchased At"
            onChange={handlePriceChange}
            className={classes.textField}
            defaultValue={newCoinId.coinInfo.currentPrice}
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
