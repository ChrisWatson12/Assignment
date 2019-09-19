import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

const epicMiddleware = createEpicMiddleware();
export default createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
