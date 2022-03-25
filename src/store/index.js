import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { addonsReducer } from './reducers/addonsReducer';

const rootReducer = combineReducers({
    addons: addonsReducer
})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));