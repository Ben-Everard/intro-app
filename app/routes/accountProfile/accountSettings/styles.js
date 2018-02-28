import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  settingRow: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight: 33,
    marginLeft: 33,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2'
  },
  ageSettings: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight: 33,
    marginLeft: 33,
    marginTop: 33
  },
  ageSlider: {
    marginRight: 33,
    marginLeft: 33,
    paddingTop: 13,
  },
  ageSection: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2'
  },
  button: {
    marginRight: 72,
    marginLeft: 72,
    marginTop: 15,
  }
});

export default styles;