import { Dimensions, StyleSheet } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: undefined,
    height: height,
  },
  event: {
    marginTop: 16,
    alignItems: 'center',
    flexDirection:'column'
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
    minHeight: 100,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 11,
  }
});

export default styles;
