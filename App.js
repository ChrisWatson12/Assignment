import React, {Fragment} from 'react';
import {SafeAreaView} from 'react-native';
import {GoogleMapView} from './src/components/GoogleMapView';
import SearchInput from './src/components/SearchInput';

const App = () => {
  return (
    <Fragment>
      <SafeAreaView style={{backgroundColor: 'white'}} />
      <GoogleMapView />
      <SearchInput clearButtonMode={'while-editing'} />
    </Fragment>
  );
};

export default App;
