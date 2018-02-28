import { StyleSheet } from 'react-native';

const styles = StyleSheet.create ({
  event: {
    marginTop: 16,
    alignItems: 'center',
    flexDirection:'column',
  },
  fullDescription: {
    backgroundColor: '#FFF',
    height: 267,
    marginRight: 7,
    marginLeft: 7,
    
  },
  iconsMargin: {
    marginTop: 22
  },
  description: {
    marginTop: 25
  },
  mapLocation: {
    height: 157,
    backgroundColor: '#FFF',
    marginLeft: 7,
    marginRight: 7
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  editButton: {
    marginRight: 12,
    marginLeft: 24,
    marginTop: 34,
    width: 150
  },
  submitButton: {
    marginRight: 24,
    marginTop: 34,
    width: 150
  },
  title: {
    marginTop: 33
  }
})

export default styles;