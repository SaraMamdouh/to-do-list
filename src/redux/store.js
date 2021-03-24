import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import ListReducer from './todo/ListReducer';
import thunk from 'redux-thunk'



export const store = createStore(ListReducer, composeWithDevTools( applyMiddleware(logger,thunk)));


