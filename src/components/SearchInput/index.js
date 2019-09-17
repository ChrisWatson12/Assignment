import React from 'react';
import {View, ViewPropTypes, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './style';
import {SEARCH} from './constant';

const SearchInput = ({
  customContainerStyle,
  customInputStyle,
  placeholder,
  ...otherProps
}) => (
  <View style={customContainerStyle || styles.inputContainer}>
    <TextInput
      style={[styles.txtInput, customInputStyle]}
      placeholder={placeholder}
      placeholderTextColor={'grey'}
      {...otherProps}
    />
  </View>
);

SearchInput.propTypes = {
  customContainerStyle: ViewPropTypes.style,
  customInputStyle: PropTypes.object,
};

SearchInput.defaultProps = {
  placeholder: SEARCH,
  customInputStyle: styles.defaultInput,
};

export default SearchInput;
