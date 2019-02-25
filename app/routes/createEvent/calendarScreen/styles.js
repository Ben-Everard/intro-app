import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  calendar: {
    marginTop: 32,
    marginRight:25,
    marginLeft: 25,
    height: 258
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  datePicker: {
    backgroundColor: '#FFF'
  },
  selectors: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 25,
    marginLeft:25,
    marginTop: 50
  },
  select: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 5,
    height: 34,
    width: 145,
    
  },
  text: {
    lineHeight: 20,
    marginLeft: 8,
    width: 61,
    marginRight: 31
  },
  arrows: {
    borderLeftWidth: 1.5,
    height: 34,
    marginRight: 15,
    alignItems: 'center'
  },
  arrow: {
    position: 'absolute',
    left: 15,
    right: 15,
    top: 9,
    bottom: 9
  },
  button: {
    marginTop: 75,
    marginRight: 25,
    marginLeft: 25
  },
  doneText: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default styles;