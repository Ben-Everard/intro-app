import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  locationName: {
    fontSize: 11,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 6,
    paddingTop: 24
  },
  locationIcon: {
    marginRight: 16
  },
  locationAddress: {
    color: '#00CDAC',
    fontSize: 10
  },
  location: {
    flexDirection: 'column',
    alignItems: 'center',
    borderTopColor: "#EEE",
    borderTopWidth: .5,
  },
  directions: {
    flexDirection: 'row',
    marginRight: 50,
    marginLeft: 50,
  }
});

export default styles;