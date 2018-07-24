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
  },
  greenText: {
    color: '#00CDAC',
    fontSize: 11,
    marginTop: 5,
    marginBottom: 20,
  },
  grayText: {
    color: '#5C6670',
    fontSize: 11,
  },
  linking: {
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    marginRight: 72,
    marginLeft: 72,
  },
  paginationDots: {
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor: 'transparent'
  },
  pagination: {
    top: 21,
    marginBottom: 15
  },
  fixedButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: height - 100, 
    backgroundColor: '#FFF',
    width: width,
    height: 150,
  },
  scrollHeight: {
    marginBottom: 80
  }
});

export default styles;