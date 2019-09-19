import React, {createRef, useState} from 'react';
import {View, Text} from 'react-native';
import {Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import GoogleMapView from '../../components/GoogleMapView';
import AutoCompleteSearchInput from '../../components/AutoCompleteSearchInput';
import {fetchPlaces, clearPlacesList} from './actionCreator';
import {styles} from './style';

const latLngDelta = {latitudeDelta: 0.0922, longitudeDelta: 0.0421};
const autoCompleteInputRef = createRef();

const DashBoard = props => {
  const [marker, changeMarker] = useState({
    latitude: 30.704649,
    longitude: 76.717873,
    ...latLngDelta,
  });
  const {searchPlaces, clearPlaces, placesData, errorMsg, isLoading} = props;

  const onChangeInputValue = input => {
    searchPlaces(input);
  };

  const onSelectedPlace = ({
    geometry: {
      location: {lat: latitude, lng: longitude},
    },
  }) => {
    clearPlaces();
    autoCompleteInputRef.current.clear();
    changeMarker({latitude, longitude, ...latLngDelta});
  };

  return (
    <View style={styles.container}>
      <GoogleMapView region={marker}>
        <Marker coordinate={marker} />
      </GoogleMapView>
      <AutoCompleteSearchInput
        ref={autoCompleteInputRef}
        customContainerStyle={styles.autoCompleteInput}
        onChangeText={onChangeInputValue}
        listData={placesData}
        loading={isLoading}
        onPressListItem={onSelectedPlace}
      />
      <Text style={styles.errText}>{errorMsg}</Text>
    </View>
  );
};

const mapStateToProps = ({dashboardReducer}) => ({
  placesData: dashboardReducer.placesData,
  errorMsg: dashboardReducer.errorMsg,
  isLoading: dashboardReducer.isLoading,
});

const mapDispatchToProps = dispatch => ({
  searchPlaces: query => dispatch(fetchPlaces(query)),
  clearPlaces: () => dispatch(clearPlacesList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoard);
