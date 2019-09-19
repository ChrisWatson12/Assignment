import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../utils';

// hp or wp function argument could be number or string along with percentage to readability purpose
// e.g. hp(5) or hp('5%')
export const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: wp(2),
  },
  txtInput: {
    height: hp(6),
    backgroundColor: 'white',
  },
  defaultInput: {
    fontSize: hp(2),
    paddingHorizontal: wp(2),
  },
  listContainer: {
    backgroundColor: 'white',
    marginTop: hp(1),
    marginBottom: hp(4),
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  placeTxt: {
    fontSize: hp(2),
    fontWeight: '500',
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
  },
  loadingCloseContainer: {
    flexDirection: 'row',
    height: hp(6),
    position: 'absolute',
    right: 0,
    paddingHorizontal: wp(3),
    justifyContent: 'center',
  },
  cardStyle: {
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  closeIcon: {
    height: hp(2),
    width: hp(2),
  },
  closeBtn: {
    marginHorizontal: wp(2),
    alignSelf: 'center',
  },
  closeBtnSlop: {
    top: hp(1),
    bottom: hp(1),
    left: wp(2),
    right: wp(2),
  },
});
