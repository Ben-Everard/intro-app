import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  topRow: {
    marginBottom: 7,
    alignItems: 'center',
    flexDirection:'row',
    backgroundColor: 'transparent',
  },
  bottomRow: {
    alignItems: 'center',
    flexDirection:'row',
    backgroundColor: 'transparent',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 7,
  },
  wrapper: {
    height: 250
  },
  blackText: {
    marginLeft: 30,
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  }
})

export default styles;