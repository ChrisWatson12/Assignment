import {combineEpics} from 'redux-observable';
import {autoCompleteSearchEpic} from '../containers/Dashboard/epic';

// You can add multiple epics here using combine epics
export default combineEpics(autoCompleteSearchEpic);
