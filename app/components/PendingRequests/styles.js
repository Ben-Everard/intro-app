import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  eventRequest: {
    flexDirection: 'row',
    marginTop: 21
  },
  profileImage: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 90
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  acceptDecline: {
    marginLeft: 25,
    flexDirection: 'column',
    alignItems: 'flex-start',
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