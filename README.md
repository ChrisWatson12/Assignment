# Google Places Autocomplete Search Using Redux-Observable


You know what functional reactive programming is, and if you're like me, you really like how natural it feels to work with data. Time to apply this concept to your React-Native/Redux applications.

First of all, as any Redux middleware, you have to add it to your Redux application when creating the store.

First, to install it, run
`npm install --save rxjs redux-observable react react-redux`
or
`yarn add rxjs redux-observable react react-redux`
depending on the tool that you're using.

Now, the basis of Redux Observable are epics. Epics are similar to sagas in Redux-Saga, the difference being that instead of waiting for an action to dispatch and delegating the action to a worker, then pausing execution until another action of the same type comes using the yield keyword, epics run separately and listen to a stream of actions, and then reacting when a specific action is received on the stream. The main component is the ``ActionsObservable`` in Redux-Observable which extends the ``Observable`` from RxJS. This observable represents a stream of actions, and every time you dispatch an action from your application it is added onto the stream.

Okay, let's start by creating our Redux store and adding Redux Observable middleware to it (small reminder, to bootstrap a React-Native project you can use the React-Native CLI). After we're sure that we have all the dependencies installed (redux, react-redux, rxjs, redux-observable), we can start by modifying our ```App.js``` file to look like this

```
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import DashBoard from './src/containers/Dashboard';
import store from './src/redux/store';
import {styles} from './src/containers/Dashboard/style';

const App = () => (
  <Provider store={store}>
    <SafeAreaView style={styles.safeArea}>
      <DashBoard />
    </SafeAreaView>
  </Provider>
);

export default App;
```

Path `src/redux/store.js`

```
import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';

const epicMiddleware = createEpicMiddleware();
export default createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);


```

As you might have noticed, we're missing the ``epics`` and ``reducers``. Don't worry about this, we'll show them later. For now, let's take a look at what's going on here:

First of all, we're importing the necessary functions to create our store and apply our middleware. After that, we're using the ``createEpicMiddleware`` from Redux Observable to create our middleware, and pass it the root epic (which we'll get to in a moment). Then we create our store using the ``createStore`` function and pass it our root reducer and apply the epic middleware to the store.

Okay, now that we have everything set up, let's first create our ``dashboardReducer``. Create a new folder called ``src/containers/Dashboard``, and in it, a new file called ``reducer.js``. Add the following code to it:


```

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

```
Anyone familiar with Redux already knows what's going on here - we're creating a reducer function which takes ``state`` and ``action`` as parameters, and depending on the action type it returns a new state (since we don't have any actions defined yet, we just add the ``default`` block and return the unmodified state).

Now create ``rootReducer.js`` inside ``src/redux`` folder with following code:

```
import {combineReducers} from 'redux';
import dashboardReducer from '../containers/Dashboard/reducer';

// You can use multiple reducers and combined all here
const appReducer = combineReducers({
  dashboardReducer,
});

export default (state, action) => appReducer(state, action);

```

Now, go back to your ``store.js`` file and add the following import:

```
import rootReducer from './rootReducer';

```

As you can see, now we don't have the error about ``rootReducer`` not existing. Now let's create our ``rootEpic``; GO to ``src/redux`` directory and in it create a file called ``rootEpic.js``. In it, add the following code for now:

```
import {combineEpics} from 'redux-observable';

// You can add multiple epics here using combine epics
export default combineEpics();

```

Here we're just using the provided ``combineEpics`` function from Redux Observable to combine our (as of now, nonexistent) epics and assign that value to a constant which we export. We should probably fix our other error in the ``store.js`` file now by simply adding the following import:

```
import rootEpic from './rootEpic';

```
Great! Now that we handled all the configuration, we can go and define the types of actions that we can dispatch and also action creators for google places.

To get started, create a new file called actionCreator.js inside ``src/container/Dashboard`` folder.
(Note: for large, production-grade projects you should group your actions, reducers and epics in a logical way instead of putting it all in one file, however, it makes no sense here since our app is very small)

Before we start writing code, let's think about what types of actions we can dispatch. Normally, we would need an action to notify Redux/Redux-Observable that it should start fetching the places, let's call that action FETCH_PLACES. Since this is an async action, we don't know when exactly it will finish, so we will want to dispatch a FETCH_PLACES_SUCCESS action whenever the call completes successfully. In similar manner, since this is an API call and it can fail we would like to notify our user with a message, hence we would dispatch a FETCH_PLACES_FAILURE action and handle it by showing an error message. Last case is clear list of place or places data we will dispatch CLEAR_PLACES_LIST.

Let's define these actions (and their action creators) in code:

```

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


```

For anyone who is unclear about what I'm doing here, I'm simply defining constants for the action types and then using the lambda shorthand notation of ES6 I am creating arrow functions which return a plain object containing a type and (optional)  data, message etc. property.

Separate Out actionTypes called ``actionType.js`` to look managable coding as follow:

```
export const FETCH_PLACES = 'FETCH_PLACES';
export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const FETCH_PLACES_FAILURE = 'FETCH_PLACES_FAILURE';
export const CLEAR_PLACES_LIST = 'CLEAR_PLACES_LIST';

```

Now that we've created our actions and action creators, let's go and handle these actions in our reducer:
Update your ``src/container/Dashboard/reducer.js`` to the following.

```

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

```
Now that we've done all that, we can FINALLY write some Redux-Observable code.

Go to your ``epics/index.js`` file and let's create our first epic. To start off, you're going to need to add some imports:

```
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';
import {switchMap, debounceTime, map, catchError} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {FETCH_PLACES} from './actionType';
import {fetchPlacesSuccess, fetchPlacesFailure} from './actionCreator';
import {API_URL, API_PARAMS, GOOGLE_PLACES_API_KEY} from '../../config';

```

What we did here is import the action creators that we will need to dispatch as well as the action type that we will need to watch for in the action stream, and some operators from RxJS as well as the Observable. Note that neither RxJS nor Redux Observable import the operators automatically, therefore you have to import them by yourself (another option is to import the entire 'rxjs' module in your entry index.js, however I would not recommend this as it will give you large bundle sizes). Okay, let's go through these operators that we've imported and what they do:

map - similar to Javascript's native Array.map(), map executes a function over each item in the stream and returns a new stream/Observable with the mapped items.
debounceTime - debounce the API request.
of - creates an Observable/stream out of a non-Observable value (it can be a primitive, an object, a function, anything).
ajax - is the provided RxJS module for doing AJAX requests; we will use this to call the API.
catchError - is used for catching any errors that may have occured
switchMap - is the most complicated of these. What it does is, it takes a function which returns an Observable, and every time this inner Observable emits a value, it merges that value to the outer Observable (the one upon which switchMap is called). Here's the catch tho, every time a new inner Observable is created, the outer Observable subscribes to it (i.e listens for values and merges them to itself), and cancels all other subscriptions to the previously emitted Observables. This is useful for situations where we don't care whether the previous results have succeeded or have been cancelled. For example, when we dispatch multiple actions for fetching the google places we only want the latest result, switchMap does exactly that, it will subscribe to the latest result and merge it to the outer Observable and discard the previous requests if they still haven't completed. When creating POST requests you usually care about whether the previous request has completed or not, and that's when mergeMap is used. mergeMap does the same except it doesn't unsubscribe from the previous Observables.

With that in mind, let's see how the Epic for fetching the google places will look like:

```
export const autoCompleteSearchEpic = action$ =>
  action$.pipe(
    ofType(FETCH_PLACES),
    debounceTime(500),
    switchMap(({queryText}) =>
      ajax
        .getJSON(
          `${API_URL}${queryText}&${API_PARAMS.key}${GOOGLE_PLACES_API_KEY}`,
        )
        .pipe(map(data => fetchPlacesSuccess(data))),
    ),
    catchError(error => of(fetchPlacesFailure(error.message))),
  );
  
```
After this, there's one more thing remaining, and that is to add our epic to the ``combineEpics`` function call, like this:

```
export default combineEpics(autoCompleteSearchEpic);

```
Okay, there's a lot going on here, I'll give you that. But let's break it apart piece by piece.

ajax.getJSON(url) returns an Observable with the data from the request as a value in the stream.
.pipe(map(data => fetchPlacesSuccess(data))) gets the ``data`` property from the response and dispatch API success action with ``data``.

```
ajax
        .getJSON(
          `${API_URL}${queryText}&${API_PARAMS.key}${GOOGLE_PLACES_API_KEY}`,
        )
        .pipe(map(data => fetchPlacesSuccess(data)))

```

The ``switchMap`` that wraps this code takes this Observable and merges the inner Observable's stream to the stream of the Observable that calls switchMap. If another request for the google places fetch came through, this operation would be repeated again and the previous result discarded, thanks to switchMap.

``map(data => fetchPlacesSuccess(data))`` simply takes this new value we added to the stream and maps it to an action of type FETCH_PLACES_SUCCESS which will be dispatched after the Observable is returned from the Epic.

``catchError(error => of(fetchPlacesFailure(error.message)))`` catches any errors that might have happened and simply returns an Observable. This Observable is then propagated through switchMap which again merges it to the outer Observable and we get an action of type FETCH_PLACES_FAILURE in the stream.

After this, all we need to do is render a UI, which will have a ``AutoCompleteTextInput`` on change text from this component that dispatches the action and a list to show the data. Let's do that; start off by creating a new folder called ``src/components/AutoCompleteSearchInput`` and a new file called `index.js` and `style.js`.

```
import React, {memo, forwardRef} from 'react';
import {
  View,
  ViewPropTypes,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './style';
import locale from '../../locale';

// In case of android may be ActivityIndicator not working properly because animating prop only works for IOS
const AutoCompleteSearchInput = forwardRef((props, ref) => {
  const {
    customContainerStyle,
    customInputStyle,
    placeholder,
    listData,
    loading,
    onPressListItem,
    ...otherProps
  } = props;

  const renderItems = ({item}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onPressListItem(item)}>
      <Text style={styles.placeTxt} numberOfLines={1}>
        {item.formatted_address}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[customContainerStyle, styles.inputContainer]}>
      <TextInput
        ref={ref}
        style={[styles.txtInput, styles.cardStyle, customInputStyle]}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        {...otherProps}
      />
      <View style={styles.loadingCloseContainer}>
        <ActivityIndicator animating={loading} size={20} />
      </View>
      <FlatList
        style={[styles.listContainer, styles.cardStyle]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={listData}
        renderItem={renderItems}
      />
    </View>
  );
});

AutoCompleteSearchInput.propTypes = {
  customContainerStyle: ViewPropTypes.style,
  customInputStyle: PropTypes.object,
  listData: PropTypes.array,
  loading: PropTypes.bool,
  onPressListItem: PropTypes.func,
};

AutoCompleteSearchInput.defaultProps = {
  placeholder: locale.search,
  customInputStyle: styles.defaultInput,
  listData: [],
  loading: false,
  onPressListItem: () => {},
};

export default memo(AutoCompleteSearchInput);

```
This component show list of google places and on click list item show new marker on google map. 
Yeah we need to integrate google map also using following command:

``
npm install --save react-native-maps
``
or

``
yarn add react-native-maps
``
Create common component for google map inside ``src/component/GoogleMapView`` folder with new file called ``index.js`` using following code:

```
import React, {memo} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from './style';

const GoogleMapView = ({children, ...otherProps}) => (
  <MapView
    provider={PROVIDER_GOOGLE}
    style={styles.mapContainer}
    {...otherProps}>
    {children}
  </MapView>
);

export default memo(GoogleMapView);
```

So i think main things covered up in above documentation there are some major points like following:
• we use ``React Hooks`` for functional programming purpose or boost the perfomance of the app or manage state of the functional component.
• we use ``React Memo`` to avoid unnecessary re-render in children components.
• we use ``React ForwardRef`` to pass ref between parent and children component.

# Challenges

```
• I haven't laptop in my room nowdays, and arranged a laptop from friend.
• I just give my 2 to 3 hours maximum per day so its really great challenge for me.
• So i need to complete my assignment before 20 Sep 2019 9:00 AM. 
  Because my friend need his laptop urgent,so finally am done with this. 
  I know there is lots of things that could be written more proficiency. 
  But i don't have time to do this.

```

# Best Regard
```
Kulbhushan Singh.
```

