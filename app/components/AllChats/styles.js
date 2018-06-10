import { StyleSheet } from 'react-native';

const styles = StyleSheet.create ({
  allChatContainer: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 13
  },
  chatContainer: {
    marginTop: 18,
    flexDirection: 'row'
  },
  chatTitle: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  eventChat: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 17
  },
  eventName: {
    fontSize: 18,
    color: '#F5A623',
    fontFamily: 'American Typewriter'
  },
  images: {
    width: 90
  },
  chat: {
    fontSize: 12,
    color: '#7C7C7C',
    fontFamily: 'American Typewriter',
    marginTop: 5
  }
});

export default styles;