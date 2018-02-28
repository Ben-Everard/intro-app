import { StyleSheet } from 'react-native';

const styles = StyleSheet.create ({
container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: undefined,
    height: undefined,
  },
  categories: {
    height: 44,
    marginBottom: 17.5,
    marginRight: 24,
    marginLeft: 24
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  description: {
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 16
  },
  button: {
    marginRight: 72,
    marginLeft: 72
  },
  paginationDots: {
    alignItems: 'center',
    flexDirection:'column',
    backgroundColor: 'transparent'  
  },
  pagination: {
    marginTop: 21
  }
});

export default styles;