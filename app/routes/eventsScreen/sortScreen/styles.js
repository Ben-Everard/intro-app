import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  selectionArea: {
    marginRight: 25,
    marginLeft: 25,
  },
  search: {
    height: 32, 
    borderColor: '#000', 
    borderWidth: 1,
    marginTop: 28,
    marginBottom: 24,
    fontSize: 10,
    paddingLeft: 17,
    paddingTop: 9,
    paddingBottom: 9 
  },
  sliderView: {
    marginBottom: 18
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sliderText: {
    color: '#FFB400',
    fontSize: 12,
    fontWeight: 'bold'
  },
  image: {
    width: 40,
    height: 43
  }
})

export default styles;