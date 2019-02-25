import { StyleSheet, Dimensions } from 'react-native';

let {height, width} = Dimensions.get('window');
let halfWidth = width / 2;

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
    marginBottom: 14
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
  },
  checkbox: {
    marginBottom: 5,
    width: halfWidth - 25,
    height: 32,
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 10,
    color: '#5C6670',
    fontWeight: '500',
  },
  button: {
    marginTop: 30,
  },
  checkboxArea: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
  }
})

export default styles;