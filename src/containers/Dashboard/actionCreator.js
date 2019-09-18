import {
  FETCH_PLACES,
  FETCH_PLACES_FAILURE,
  FETCH_PLACES_SUCCESS,
} from './actionType';

export const fetchPlaces = queryText => ({
  type: FETCH_PLACES,
  queryText,
});

export const fetchPlacesSuccess = data => ({
  type: FETCH_PLACES_SUCCESS,
  data,
});

export const fetchPlacesFailure = message => ({
  type: FETCH_PLACES_FAILURE,
  message,
});
