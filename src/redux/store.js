import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootReducers from './rootReducers';
import rootEpics from './rootEpics';

const epicMiddleware = createEpicMiddleware();
export default createStore(rootReducers, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpics);
