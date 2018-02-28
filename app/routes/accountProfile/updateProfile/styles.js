import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    height: null
  },
  editArea: {
    marginRight: 24,
    marginLeft: 24
  },
  inputBox: {
    height: 248,
    borderColor: 'gray', 
    borderWidth: 1,
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
  bioEdit: {
    textAlign: 'center',
    marginBottom: 19,
    marginTop: 19,
    fontSize: 11
  },
  categories: {
    height: 44,
    marginBottom: 17.5,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  description: {
    textAlign: 'center',
    marginBottom: 18,
    marginTop: 16
  },
  instaText: {
    textAlign: 'center',
    fontSize: 11
  },
  instaLink: {
    color: '#00CDAC',
    textAlign: 'center',
    fontSize: 11
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  button: {
    width: 150,
  },
  buttonCancel: {
    width: 150,
    marginRight: 24
  }
});

export default styles;