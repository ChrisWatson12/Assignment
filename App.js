import React from 'react';
import {Provider} from 'react-redux';
import DashBoard from './src/containers/Dashboard';
import store from './src/redux/store';

const App = () => (
  <Provider store={store}>
    <DashBoard />
  </Provider>
);

export default App;
