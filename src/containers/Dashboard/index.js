import React, {Fragment} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {connect} from 'react-redux';
import {GoogleMapView} from '../../components/GoogleMapView';
import AutoCompleteSearchInput from '../../components/AutoCompleteSearchInput';
import {fetchPlaces} from './actionCreator';

const DashBoard = ({searchPlaces, placesData, errorMsg}) => {
  const onChangeInputValue = input => {
    searchPlaces(input);
  };
  return (
    <Fragment>
      <SafeAreaView style={{backgroundColor: 'white'}} />
      <GoogleMapView />
      <AutoCompleteSearchInput
        clearButtonMode={'while-editing'}
        onChangeText={onChangeInputValue}
        listData={placesData}
      />
      <Text style={{color: 'red', textAlign: 'center', paddingHorizontal: 15}}>
        {errorMsg}
      </Text>
    </Fragment>
  );
};

const mapStateToProps = ({dashboardReducer}) => ({
  placesData: dashboardReducer.placesData,
  errorMsg: dashboardReducer.errorMsg,
});

const mapDispatchToProps = dispatch => ({
  searchPlaces: query => dispatch(fetchPlaces(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoard);
