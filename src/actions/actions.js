/* eslint-disable no-use-before-define */
import * as types from '../constants/actionTypes';

export const togglePopupActionCreator = () => ({ type: types.TOGGLE_POPUP });

export const addCoinActionCreator = (coinObj) => {
  console.log('testing docker stuff');
  return {
    type: types.ADD_COIN,
    payload: coinObj
  };
};

export const refreshProfitsActionCreator = (coinObj) => {
  console.log('inside refresh profits action creator: ', coinObj);
  return {
    type: types.REFRESH_PROFITS,
    payload: coinObj
  };
};

export const toggleQuantityPopupActionCreator = (coinCode) => ({
  type: types.TOGGLE_QUANTITY_POPUP,
  payload: coinCode
});

export const soldQuantityActionCreator = (coinObj) => ({
  type: types.SOLD_QUANTITY,
  payload: coinObj
});

export const buyMoreActionCreator = (coinObj) => ({
  type: types.BUY_MORE,
  payload: coinObj
});

export const chartPopupActionCreator = (coinCode) => {
  console.log('coin code inside chartpopupaction creator: ', coinCode);
  return {
    type: types.CHART_POPUP,
    payload: coinCode
  };
};

export const updateUserInfoActionCreator = (userData) => {
  console.log('inside action creator: ', userData);
  return {
    type: types.UPDATE_USER_INFO,
    payload: {
      ...userData
    }
  };
};

export const addChartActionCreator = (chartData, coinCode) => {
  console.log('addChartActionCreator ID: ', chartData);
  console.log(coinCode);
  return (dispatch) => {
    dispatch(addChartStarted(chartData));
    fetch(
      `https://3mi5k0hgr1.execute-api.us-east-2.amazonaws.com/dev/getchart?id=${chartData}`
    )
      .then((res) => res.json())
      .then((data) => {
        const labelArr = data.labels;
        const priceArr = data.prices.map((price) => price[1]);
        dispatch(addChartSuccess({ name: chartData, labelArr, priceArr }));
        dispatch(chartPopupActionCreator(coinCode));
      })
      .catch((err) => {
        dispatch(addChartFailure(err.message));
      });
  };
};

const addChartSuccess = (data) => ({
  type: types.ADD_CHART_SUCCESS,
  payload: {
    ...data
  }
});

const addChartStarted = (chartName) => ({
  type: types.ADD_CHART_STARTED,
  payload: chartName
});

const addChartFailure = (error) => ({
  type: types.ADD_CHART_FAILURE,
  payload: {
    error
  }
});

/*

export const addChartActionCreator = (chartData) => {
    console.log(chartData);
    return {
        type: types.ADD_CHART,
        payload: chartData,
    }
}
*/
