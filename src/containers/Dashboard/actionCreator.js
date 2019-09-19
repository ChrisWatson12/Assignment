import {
  FETCH_PLACES,
  FETCH_PLACES_FAILURE,
  FETCH_PLACES_SUCCESS,
  CLEAR_PLACES_LIST,
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

export const clearPlacesList = () => ({
  type: CLEAR_PLACES_LIST,
});
