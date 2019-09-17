import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from './style';

export const GoogleMapView = () => (
  <MapView provider={PROVIDER_GOOGLE} style={styles.mapContainer} />
);
