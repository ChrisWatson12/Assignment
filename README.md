# Google places autocomplete search using redux-observable middleware


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
import epics from './epics';
import reducers from './reducers';

const epicMiddleware = createEpicMiddleware();
export default createStore(reducers, applyMiddleware(epicMiddleware));
epicMiddleware.run(epics);

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
and create ``rootReducer.js`` inside ``src/redux`` folder with following code:

```



Anyone familiar with Redux already knows what's going on here - we're creating a reducer function which takes ``state`` and ``action`` as parameters, and depending on the action type it returns a new state (since we don't have any actions defined yet, we just add the ``default`` block and return the unmodified state).

Now, go back to your ``App.js`` file and add the following import:
