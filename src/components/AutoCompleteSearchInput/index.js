import React, {Fragment} from 'react';
import {
  View,
  ViewPropTypes,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './style';
import {SEARCH} from './constant';

const AutoCompleteSearchInput = ({
  customContainerStyle,
  customInputStyle,
  placeholder,
  listData,
  ...otherProps
}) => {
  const renderPlaceName = ({item}) => (
    <TouchableOpacity>
      <Text style={styles.placeTxt}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={customContainerStyle || styles.inputContainer}>
      <TextInput
        style={[styles.txtInput, customInputStyle]}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        {...otherProps}
      />
      <FlatList
        style={styles.listContainer}
        data={listData}
        renderItem={renderPlaceName}
      />
    </View>
  );
};

AutoCompleteSearchInput.propTypes = {
  customContainerStyle: ViewPropTypes.style,
  customInputStyle: PropTypes.object,
};

AutoCompleteSearchInput.defaultProps = {
  placeholder: SEARCH,
  customInputStyle: styles.defaultInput,
};

export default AutoCompleteSearchInput;
