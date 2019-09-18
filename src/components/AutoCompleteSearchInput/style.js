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
    top: hp(6),
    left: wp(3),
    right: wp(3),
  },
  txtInput: {
    height: hp(5),
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    backgroundColor: 'white',
  },
  defaultInput: {
    fontSize: hp(2),
    paddingHorizontal: wp(2),
  },
  listContainer: {
    backgroundColor: 'white',
    marginVertical: hp(1),
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  placeTxt: {
    fontSize: hp(2),
    fontWeight: '500',
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
  },
});
