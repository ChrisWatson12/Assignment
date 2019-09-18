import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import epics from './epics';
import reducers from './reducers';

const epicMiddleware = createEpicMiddleware();
export default createStore(reducers, applyMiddleware(epicMiddleware));
epicMiddleware.run(epics);
