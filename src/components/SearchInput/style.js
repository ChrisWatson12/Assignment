import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils';

// hp or wp function argument could be number or string along with percentage to readability purpose
// e.g. hp(5) or hp('5%')
export const styles = StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    top: hp(6),
    left: wp(3),
    right: wp(3),
  },
  txtInput: {
    height: hp(5),
  },
  defaultInput: {
    fontSize: hp(2),
    paddingHorizontal: wp(2),
  },
});
