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
