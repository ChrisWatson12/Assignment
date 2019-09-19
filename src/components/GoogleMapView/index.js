import React, {memo} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from './style';

const GoogleMapView = ({children, ...otherProps}) => (
  <MapView
    provider={PROVIDER_GOOGLE}
    style={styles.mapContainer}
    showsUserLocation
    {...otherProps}>
    {children}
  </MapView>
);

export default memo(GoogleMapView);
