import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';

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
  chartDisplay: { minWidth: '800px' }
}));

export default function ShowChart({ chart, showChart, coinInfo, searchId }) {
  const classes = useStyles();
  const theme = useTheme();
  const [data, setData] = useState({});

  const options = {
    animation: false,
    layout: { padding: 0 },
    legend: { display: false },
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  const getHourArr = (currHour) => {
    let labelArr = [];
    let hour = currHour;
    while (labelArr.length < 25) {
      if (hour < 0) hour = 24;
      labelArr.unshift(`${hour}:00`);
      hour -= 1;
    }
    return labelArr;
  };

  useEffect(() => {
    const today = new Date();
    let currHour = today.getHours();
    const hourLabels = getHourArr(currHour);

    fetch(
      `https://3mi5k0hgr1.execute-api.us-east-2.amazonaws.com/dev/getchart?id=${searchId}`
    )
      .then((res) => res.json())
      .then((data) => {
        const priceArr = data.prices.map((price) => price[1]);
        setData({
          labels: hourLabels,
          datasets: [
            {
              label: coinInfo.name,
              data: priceArr,
              backgroundColor: colors.indigo[500]
            }
          ]
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Dialog
      open={chart}
      onClose={() => {
        showChart(false);
      }}
      aria-labelledby="form-dialog-title"
      className={classes.chartDisplay}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle
        id="form-dialog-title"
        className={classes.pageText}
        variant="h3"
      >
        View the price history for {coinInfo.name} over the past 24 hours.
      </DialogTitle>
      <DialogContent>
        <Line data={data} options={options} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            showChart(false);
          }}
          className={classes.submit}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
