import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  },
  profileSections: {
    marginTop: 31,
    paddingBottom: 31,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
    marginRight: 53,
    marginLeft: 53
  },
  textSection: {
    textAlign: 'center',
  },
  textSectionName: {
    fontSize: 24,
    fontFamily: 'American Typewriter'
  },
  viewEdit: {
    color: '#00CDAC',
    textAlign: 'center'
  },
  nameAgeEditRow: {
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'center'
  }
});

export default styles;