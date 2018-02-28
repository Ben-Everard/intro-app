import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  inputs: {
    marginTop: 24
  },
  inputBox: {
    height: 32, 
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 32,
    marginLeft: 31,
    marginBottom: 15,
    fontSize: 12,
    padding: 10
  },
  inputArea: {
    height: 107,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 32,
    marginLeft: 31,
    fontSize: 12,
    padding: 10
  },
  button: {
    marginRight: 25,
    marginLeft: 25,
    marginTop: 58
  },
  detailsArea: {
    marginTop: 24
  },
  location: {
    color: '#00CDAC'
  },
  locationSection: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 31,
    marginBottom: 15,
  },
  findLocation: {
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  place: {
    fontSize: 10,
    marginRight: 32,
    textAlign: 'right',
    width: 175
  }
});

export default styles;