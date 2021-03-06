import React, {memo, forwardRef} from 'react';
import {
  View,
  ViewPropTypes,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './style';
import locale from '../../locale';

// In case of android may be ActivityIndicator not working properly because animating prop only works for IOS
const AutoCompleteSearchInput = forwardRef((props, ref) => {
  const {
    customContainerStyle,
    customInputStyle,
    placeholder,
    listData,
    loading,
    onPressListItem,
    ...otherProps
  } = props;

  const renderItems = ({item}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onPressListItem(item)}>
      <Text style={styles.placeTxt} numberOfLines={1}>
        {item.formatted_address}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[customContainerStyle, styles.inputContainer]}>
      <TextInput
        ref={ref}
        style={[styles.txtInput, styles.cardStyle, customInputStyle]}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        {...otherProps}
      />
      <View style={styles.loadingCloseContainer}>
        <ActivityIndicator animating={loading} size={20} />
      </View>
      <FlatList
        style={[styles.listContainer, styles.cardStyle]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={listData}
        renderItem={renderItems}
      />
    </View>
  );
});

AutoCompleteSearchInput.propTypes = {
  customContainerStyle: ViewPropTypes.style,
  customInputStyle: PropTypes.object,
  listData: PropTypes.array,
  loading: PropTypes.bool,
  onPressListItem: PropTypes.func,
};

AutoCompleteSearchInput.defaultProps = {
  placeholder: locale.search,
  customInputStyle: styles.defaultInput,
  listData: [],
  loading: false,
  onPressListItem: () => {},
};

export default memo(AutoCompleteSearchInput);
