import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers';
import reducerADM from '../painelADM/reducerts';

const rootReducer = combineReducers({
  appReducer: reducer,
  admReducers: reducerADM
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;