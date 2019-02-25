import { StyleSheet } from 'react-native';

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: undefined,
    height: undefined,
  },
  eventImage: {
    alignItems: 'center',
    flexDirection:'column',
  },
  eventCard: {
    height: 192,
    marginTop: 16
  },
  titleMargin: {
    marginTop: 14
  },
  eventDescription: {
    marginTop: 3,
    marginBottom: 23,
    paddingRight: 12,
    paddingLeft: 12
  },
  event: {
    alignItems: 'center',
    flexDirection:'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginRight: 7,
    marginLeft: 7,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: '#FFF',
    height: 96
  },
});

export default styles;