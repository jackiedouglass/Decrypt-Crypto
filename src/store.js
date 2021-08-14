import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducers, composedEnhancer);

export default store;
