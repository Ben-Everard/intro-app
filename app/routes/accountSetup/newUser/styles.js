import { StyleSheet } from 'react-native';

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: undefined,
    height: undefined,
  },
  welcomeName: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
    fontFamily: 'American Typewriter'

  },
  text: {
    color: '#000',
    fontSize: 11,
    paddingRight: 53,
    paddingLeft: 53,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'American Typewriter'
  },
  paginationDots: {
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor: 'transparent'  
  },
  pagination: {
    marginTop: 25
  },
  button: {
    marginRight: 72,
    marginLeft: 72,
    marginTop: 147
  }
});

export default styles;