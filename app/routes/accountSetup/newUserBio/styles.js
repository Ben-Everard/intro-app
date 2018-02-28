import { StyleSheet } from 'react-native';

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: undefined,
    height: undefined,
  },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  inputBox: {
    height: 277, 
    borderColor: 'gray', 
    borderWidth: 1,
    marginRight: 32,
    marginLeft: 31,
    marginTop: 32,
    marginBottom: 5,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },
  textCountBox: {
    alignItems: 'center',
    marginBottom: 26
  },
  textCount: {
    fontSize: 11
  },
  button: {
    marginLeft: 72,
    marginRight: 72
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