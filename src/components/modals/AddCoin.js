import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

export default function AddCoin({ addCoinModal, openAddCoinModal }) {
  const classes = useStyles();

  const handleSubmit = () => {
    console.log('true');
    openAddCoinModal(false);
  };
  return (
    <Dialog
      open={addCoinModal}
      onClose={handleSubmit}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" className={classes.pageText}>
        Verify Your Email
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.pageText}>
          Enter the verification code emailed to you. If you don't receive it in
          the next few minutes, please check your spam folder.
        </DialogContentText>
        {/* {incorrectVerificationCode && (
        <Typography style={{ color: 'red' }}>
          Please double-check you entered in the correct verification code.
        </Typography>
      )} */}
        <TextField
          autoFocus
          margin="dense"
          id="verifCode"
          label="Verification Code"
          fullWidth
          // onChange={(e) => {
          //   setVerificationCode(e.target.value);
          // }}
        />
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
          Add Coin
        </Button>
      </DialogActions>
    </Dialog>
  );
}
