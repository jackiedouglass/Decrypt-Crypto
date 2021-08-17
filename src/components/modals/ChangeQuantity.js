import Dialog from '@material-ui/core/Dialog';
import { useState, useEffect } from 'react';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import RadioGroup from '@material-ui/core/RadioGroup';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  radioBtns: {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px'
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

export default function ChangeQuantity({
  changeQuantity,
  showQuantityModal,
  email,
  fullList,
  buyMore,
  soldQuantity,
  coinInfo,
  cashedOutAmnt
}) {
  const classes = useStyles();
  const [coin, setCoin] = useState(coinInfo.coinCode);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedValue, setSelectedValue] = useState('sold');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  const coinOptions = fullList.map((coin) => {
    return (
      <MenuItem value={coin.coinCode}>
        {coin.name} ({coin.coinCode.slice(0, -3).toUpperCase()})
      </MenuItem>
    );
  });

  const handleSubmit = () => {
    // console.log(coinInfo.name, quantity, price, email, selectedValue);
    let bodyObj = {};
    if (selectedValue === 'sold') {
      bodyObj.coinCode = coinInfo.coinCode;
      bodyObj.quantitySold = Number(quantity);
      bodyObj.pricePoint = Number(price);
      soldQuantity(bodyObj);
      handleDatabase(bodyObj);
    } else {
      bodyObj.coinCode = coinInfo.coinCode;
      bodyObj.quantityBought = Number(quantity);
      bodyObj.pricePoint = Number(price);
      buyMore(bodyObj);
      handleDatabase(bodyObj);
    }
  };

  const handleDatabase = (data) => {
    const updateObj = {
      email,
      coinList: fullList
    };
    if (data.quantitySold) {
      updateObj.cashedOutAmnt =
        Number(data.quantitySold) * Number(data.pricePoint) +
        Number(cashedOutAmnt);
    } else {
      updateObj.cashedOutAmnt = Number(cashedOutAmnt);
    }
    console.log('inside handle database: ', updateObj);
    fetch(
      'https://3mi5k0hgr1.execute-api.us-east-2.amazonaws.com/dev/updatequantity',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateObj)
      }
    )
      .then((postRes) => postRes.json())
      .then((finalRes) => console.log('after sending to aws: ', finalRes))
      .catch((err) => console.log(err));
    showQuantityModal(false);
  };
  return (
    <Dialog
      open={changeQuantity}
      onClose={() => {
        showQuantityModal(false);
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" className={classes.pageText}>
        Update Coin Quantity
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.pageText}>
          Select the coin you would like to update, whether you sold or bought
          more, the price you purchased/sold at, and the quantity you
          bought/sold.
        </DialogContentText>
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
              {coinOptions}
            </Select>
          </FormControl>
          <br />
          <div className={classes.radioBtns}>
            <RadioGroup
              aria-label="quantity"
              name="quantity"
              value={selectedValue}
              onChange={handleChange}
            >
              <FormControlLabel value="sold" control={<Radio />} label="Sold" />
              <FormControlLabel
                value="bought"
                control={<Radio />}
                label="Purchased More"
              />
            </RadioGroup>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Amount Purchased/Sold"
            onChange={handleQuantityChange}
            className={classes.textField}
          />

          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price Purchased/Sold At"
            onChange={handlePriceChange}
            className={classes.textField}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            showQuantityModal(false);
          }}
          className={classes.submit}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} className={classes.submit}>
          Update Quantity in Portfolio
        </Button>
      </DialogActions>
    </Dialog>
  );
}
