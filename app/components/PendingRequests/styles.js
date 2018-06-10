import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  requestContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 74
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  eventRequest: {
    flexDirection: 'row',
    marginTop: 21
  },
  profileImage: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 90
  },
  acceptDecline: {
    marginLeft: 25,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  button: {
    width: 68,
    height: 40,
    marginRight: 11,
  },
  eachButton: {
    fontFamily: 'American Typewriter',
    fontSize: 12
  },
  eventName: {
    fontSize: 18,
    color: '#F5A623',
    fontFamily: 'American Typewriter'
  },
  nameAge: {
    fontFamily: 'American Typewriter',
    fontSize: 12,
    marginTop: 5
  },
  viewMore: {
    marginTop: 18,
    color: '#7C7C7C',
    fontSize: 12
  }
});

export default styles;