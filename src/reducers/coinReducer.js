/* eslint-disable operator-linebreak */
import * as types from '../constants/actionTypes';

const initialState = {
  email: '',
  coinList: [],
  cashedOutAmnt: 0
};

const coinReducer = (state = initialState, action) => {
  let email;
  let coinList;
  let newCoin;
  let cashedOutAmnt;
  switch (action.type) {
    case types.UPDATE_USER_INFO: {
      coinList = action.payload.coinList;
      cashedOutAmnt = Number(action.payload.cashedOutAmnt);
      email = action.payload.email;
      return {
        ...state,
        email,
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
          Number(action.payload.quantity) * Number(action.payload.purchasePrice)
      };
      newCoin.coinProfit = newCoin.coinBalance - newCoin.totalCoinInvested;
      coinList = state.coinList.slice();
      coinList.push(newCoin);
      return { ...state, coinList };
    }

    case types.REFRESH_PROFITS: {
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

    default: {
      return state;
    }
  }
};

export default coinReducer;
