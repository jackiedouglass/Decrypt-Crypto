/* eslint-disable no-use-before-define */
import * as types from '../constants/actionTypes';

export const addCoinActionCreator = (coinObj) => {
  return {
    type: types.ADD_COIN,
    payload: coinObj
  };
};

export const refreshProfitsActionCreator = (coinObj) => {
  return {
    type: types.REFRESH_PROFITS,
    payload: coinObj
  };
};

export const soldQuantityActionCreator = (coinObj) => ({
  type: types.SOLD_QUANTITY,
  payload: coinObj
});

export const buyMoreActionCreator = (coinObj) => ({
  type: types.BUY_MORE,
  payload: coinObj
});

export const updateUserInfoActionCreator = (userData) => {
  return {
    type: types.UPDATE_USER_INFO,
    payload: {
      ...userData
    }
  };
};
