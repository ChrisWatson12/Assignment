import {
  FETCH_PLACES,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAILURE,
  CLEAR_PLACES_LIST,
} from './actionType';

const intialState = {
  isLoading: false,
  errorMsg: '',
  placesData: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case FETCH_PLACES:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_PLACES_SUCCESS: {
      const {
        data: {results, error_message},
      } = action;
      return {
        ...state,
        isLoading: false,
        errorMsg: error_message,
        placesData: results,
      };
    }

    case FETCH_PLACES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.message,
      };

    case CLEAR_PLACES_LIST:
      return {
        ...state,
        placesData: [],
      };
    default:
      return state;
  }
};
