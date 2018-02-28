import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 61,
    left: 20, 
    marginTop: 195,
    marginRight: 176,
    marginLeft: 176
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageText: {
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
    marginTop: 5,
    backgroundColor: 'transparent',
    color: '#FFF'
  }
});

export default styles;