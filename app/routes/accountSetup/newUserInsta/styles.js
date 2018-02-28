import { StyleSheet } from 'react-native';

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: undefined,
    height: undefined,
  },
  lowerContainer: {
    marginRight: 53,
    marginLeft: 53
  },
  welcomeName: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 30,
    fontFamily: 'American Typewriter'
  },
  cityState: {
    marginTop: 7,
    fontFamily: 'American Typewriter',
    fontSize: 11,
    textAlign: 'center'
  },
  description: {
    maxHeight: 200,
    marginTop: 7,
    textAlign: 'center',
    fontSize: 11
  },
  button: {
    marginTop: 100,
    marginRight: 72,
    marginLeft: 72
  },
  paginationDots: {
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor: 'transparent'
  },
  pagination: {
    top: 21
  }
});

export default styles;