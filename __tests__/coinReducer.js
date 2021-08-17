import subject from '../src/reducers/coinReducer';
import 'regenerator-runtime/runtime';

describe('Coin Reducer', () => {
  let state;
  beforeAll(() => {
    state = {
      email: '',
      coinList: [],
      cashedOutAmnt: 0
    };
  });

  afterAll(() => {
    state = {
      email: '',
      coinList: [],
      cashedOutAmnt: 0
    };
  });

  describe('Default state', () => {
    it('should return the default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('undeclared action types', () => {
    it('should return the original state without any duplication or additions', () => {
      const action = { type: 'NOT_REAL_TYPE' };
      expect(subject(state, action)).toBe(state);
    });
  });

  describe('UPDATE_USER_INFO', () => {
    const action = {
      type: 'UPDATE_USER_INFO',
      payload: {
        email: 'test@test.com',
        cashedOutAmnt: 700,
        coinList: [
          {
            coinBalance: 570.0593572060004,
            name: 'Ethereum',
            coinQuantity: 0.1786,
            purchasePrice: 3000,
            currPrice: 3191.821708880181,
            coinProfit: 34.259357206000345,
            coinCode: 'ethbtc',
            totalCoinInvested: 535.8000000000001
          }
        ]
      }
    };
    it("Adds a user's info", () => {
      const { email, cashedOutAmnt, coinList } = subject(state, action);
      expect(email).toEqual('test@test.com');
      expect(cashedOutAmnt).toEqual(700);
      expect(coinList).toEqual([
        {
          coinBalance: 570.0593572060004,
          name: 'Ethereum',
          coinQuantity: 0.1786,
          purchasePrice: 3000,
          currPrice: 3191.821708880181,
          coinProfit: 34.259357206000345,
          coinCode: 'ethbtc',
          totalCoinInvested: 535.8000000000001
        }
      ]);
    });
  });
  describe('ADD_COIN', () => {
    const action1 = {
      type: 'ADD_COIN',
      payload: {
        name: 'Ethereum',
        coinCode: 'ethbtc',
        quantity: 0.1786,
        purchasePrice: 3000,
        currPrice: 3191.821708880181
      }
    };
    const action2 = {
      type: 'ADD_COIN',
      payload: {
        name: 'Bitcoin',
        coinCode: 'btcbtc',
        quantity: 0.0003,
        purchasePrice: 30000,
        currPrice: 46327.3
      }
    };
    it("Add's a new coin to an empty account", () => {
      const { coinList } = subject(state, action1);
      expect(coinList).toEqual([
        {
          name: 'Ethereum',
          coinCode: 'ethbtc',
          coinQuantity: 0.1786,
          purchasePrice: 3000,
          currPrice: 3191.821708880181,
          coinBalance: 0.1786 * 3191.821708880181,
          coinProfit: 0.1786 * 3191.821708880181 - 0.1786 * 3000,
          totalCoinInvested: 0.1786 * 3000
        }
      ]);
    });

    it("Add's a new coin to an existing coin list", () => {
      state = {
        email: 'test@test.com',
        coinList: [
          {
            name: 'Ethereum',
            coinCode: 'ethbtc',
            coinQuantity: 0.1786,
            purchasePrice: 3000,
            currPrice: 3191.821708880181,
            coinBalance: 0.1786 * 3191.821708880181,
            coinProfit: 0.1786 * 3191.821708880181 - 0.1786 * 3000,
            totalCoinInvested: 0.1786 * 3000
          }
        ],
        cashedOutAmnt: 0
      };
      const { coinList } = subject(state, action2);
      expect(coinList).toEqual([
        {
          name: 'Ethereum',
          coinCode: 'ethbtc',
          coinQuantity: 0.1786,
          purchasePrice: 3000,
          currPrice: 3191.821708880181,
          coinBalance: 0.1786 * 3191.821708880181,
          coinProfit: 0.1786 * 3191.821708880181 - 0.1786 * 3000,
          totalCoinInvested: 0.1786 * 3000
        },
        {
          name: 'Bitcoin',
          coinCode: 'btcbtc',
          coinQuantity: 0.0003,
          purchasePrice: 30000,
          currPrice: 46327.3,
          coinBalance: 0.0003 * 46327.3,
          coinProfit: 0.0003 * 46327.3 - 0.0003 * 30000,
          totalCoinInvested: 0.0003 * 30000
        }
      ]);
    });
  });
});
