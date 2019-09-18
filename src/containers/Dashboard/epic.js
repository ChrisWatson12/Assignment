import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';
import {switchMap, debounceTime, map, catchError} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {FETCH_PLACES} from './actionType';
import {fetchPlacesSuccess, fetchPlacesFailure} from './actionCreator';
import {API_URL, API_PARAMS, GOOGLE_PLACES_API_KEY} from '../../config';

export const autoCompleteSearchEpic = action$ =>
  action$.pipe(
    ofType(FETCH_PLACES),
    debounceTime(1000),
    switchMap(({queryText}) =>
      ajax
        .getJSON(
          `${API_URL}${queryText}&${API_PARAMS.key}${GOOGLE_PLACES_API_KEY}`,
        )
        .pipe(map(data => fetchPlacesSuccess(data))),
    ),
    catchError(error => of(fetchPlacesFailure(error.message))),
  );
