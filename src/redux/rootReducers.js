import {combineReducers} from 'redux';
import dashboardReducer from '../containers/Dashboard/reducer';

// You can use multiple reducers and combined all here
const appReducer = combineReducers({
  dashboardReducer,
});

export default (state, action) => appReducer(state, action);
