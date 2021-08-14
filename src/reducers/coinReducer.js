/* eslint-disable operator-linebreak */
import * as types from '../constants/actionTypes';

const initialState = {
  username: '',
  coinList: [],
  popup: false,
  cashedOutAmnt: 0
};

const coinReducer = (state = initialState, action) => {
  let username;
  let popup;
  let coinList;
  let newCoin;
  let cashedOutAmnt;
  switch (action.type) {
    case types.UPDATE_USER_INFO: {
      coinList = action.payload.coinList;
      cashedOutAmnt = Number(action.payload.cashedOutAmnt);
      username = action.payload.username;
      return {
        ...state,
        username,
        coinList,
        cashedOutAmnt
      };
    }

    case types.ADD_COIN: {
      newCoin = {
        name: action.payload.name,
        coinCode: action.payload.coinCode,
        coinQuantity: Number(action.payload.quantity),
        purchasePrice: Number(action.payload.purchasePrice),
        currPrice: Number(action.payload.currPrice),
        coinBalance:
          Number(action.payload.quantity) * Number(action.payload.currPrice),
        totalCoinInvested:
          Number(action.payload.quantity) *
          Number(action.payload.purchasePrice),
        chart: false,
        loading: { status: false },
        quantityPopup: false
      };
      newCoin.coinProfit = newCoin.coinBalance - newCoin.totalCoinInvested;
      coinList = state.coinList.slice();
      coinList.push(newCoin);
      return { ...state, coinList };
    }
    case types.TOGGLE_POPUP: {
      popup = !state.popup;
      return {
        ...state,
        popup
      };
    }

    case types.TOGGLE_QUANTITY_POPUP: {
      coinList = state.coinList.slice();
      for (let i = 0; i < coinList.length; i += 1) {
        if (coinList[i].coinCode === action.payload) {
          coinList[i].quantityPopup = !coinList[i].quantityPopup;
        }
      }
      return {
        ...state,
        coinList
      };
    }

    case types.REFRESH_PROFITS: {
      // loop through coinList and if currCoinObj.coinCode === action.payload.coinCode,
      // currCoinObj.currPrice = action.payload.currPrice
      // currCoinObj.coinBalance = currCoinObj.quantity * action.payload.currPrice
      coinList = action.payload;
      return {
        ...state,
        coinList
      };
    }

    case types.SOLD_QUANTITY: {
      cashedOutAmnt = Number(state.cashedOutAmnt);
      coinList = state.coinList.slice();
      const newCashIncome =
        Number(action.payload.quantitySold) * Number(action.payload.pricePoint);
      cashedOutAmnt += newCashIncome;
      for (let i = 0; i < coinList.length; i += 1) {
        if (coinList[i].coinCode === action.payload.coinCode) {
          coinList[i].coinQuantity -= Number(action.payload.quantitySold);
          coinList[i].coinBalance =
            Number(coinList[i].coinQuantity) * Number(coinList[i].currPrice);
          coinList[i].totalCoinInvested -=
            Number(action.payload.quantitySold) *
            Number(action.payload.pricePoint);
          coinList[i].coinProfit =
            Number(coinList[i].coinBalance) -
            Number(coinList[i].totalCoinInvested);
        }
      }
      return {
        ...state,
        cashedOutAmnt,
        coinList
      };
    }

    case types.BUY_MORE: {
      coinList = state.coinList.slice();
      for (let i = 0; i < coinList.length; i += 1) {
        if (coinList[i].coinCode === action.payload.coinCode) {
          coinList[i].coinQuantity += Number(action.payload.quantityBought);
          coinList[i].coinBalance =
            Number(coinList[i].coinQuantity) * Number(coinList[i].currPrice);
          coinList[i].totalCoinInvested +=
            Number(action.payload.quantityBought) *
            Number(action.payload.pricePoint);
          coinList[i].coinProfit =
            Number(coinList[i].coinBalance) -
            Number(coinList[i].totalCoinInvested);
        }
      }
      return {
        ...state,
        coinList
      };
    }

    case types.CHART_POPUP: {
      coinList = state.coinList.slice();
      for (let i = 0; i < coinList.length; i += 1) {
        if (coinList[i].coinCode === action.payload) {
          coinList[i].chart = !coinList[i].chart;
        }
      }
      return {
        ...state,
        coinList
      };
    }

    case types.ADD_CHART_STARTED: {
      coinList = state.coinList.slice();
      for (let i = 0; i < coinList.length; i += 1) {
        if (coinList[i].name.toLowerCase() === action.payload.name) {
          coinList[i].loading.status = true;
        }
      }
      return {
        ...state,
        coinList
      };
    }

    case types.ADD_CHART_SUCCESS: {
      coinList = state.coinList.slice();
      for (let i = 0; i < coinList.length; i += 1) {
        if (coinList[i].name.toLowerCase() === action.payload.name) {
          coinList[i].loading.chartData = {
            labels: action.payload.labelArr,
            prices: action.payload.priceArr
          };
        }
      }
      return {
        ...state,
        coinList
      };
    }

    default: {
      return state;
    }
  }
};

export default coinReducer;
