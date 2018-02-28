import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // position: 'absolute', 
    marginTop: 128,
    marginRight: 102,
    marginLeft: 102
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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