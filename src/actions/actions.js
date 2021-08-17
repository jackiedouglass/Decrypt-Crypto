/* eslint-disable no-use-before-define */
import * as types from '../constants/actionTypes';

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
