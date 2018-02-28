import { Dimensions, StyleSheet } from 'react-native';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create ({
  event: {
    marginTop: 16,
    alignItems: 'center',
    flexDirection:'column'
  },
  fullDescription: {
    backgroundColor: '#FFF',
    height: 267,
    marginRight: 7,
    marginLeft: 7,
    paddingTop: 33,
  },
  iconsMargin: {
    marginTop: 22
  },
  description: {
    marginTop: 25
  },
  mapLocation: {
    height: 157,
    backgroundColor: '#FFF',
    marginLeft: 7,
    marginRight: 7
  },
  button: {
    marginRight: 24,
    marginLeft: 24,
    marginTop: 34
  },
  optionButton: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    width: width - 20,
    marginBottom: 1,
  },
  optionButtonsText: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  optionButtonCancel: {
    marginTop: 10,
    marginBottom: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#FFF',
    width: width - 20,
    opacity: 1,
    alignItems: 'center',
  },
  optionButtonReport: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#FFF',
    width: width - 20,
    opacity: 1,
    alignItems: 'center',
    marginBottom: 1
  },
  optionButtonReportOnly: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#FFF',
    width: width - 20,
    opacity: 1,
    alignItems: 'center',
  },
  optionButtonBottom: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#FFF',
    width: width - 20,
    opacity: 1,
    alignItems: 'center',
  },
  requestModal: {
    backgroundColor: '#FFF',
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  requestButton: {
    marginTop: 20
  }
});

export default styles;