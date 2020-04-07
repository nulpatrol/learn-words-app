import { Dimensions, StyleSheet } from 'react-native';

const accentColor = '#00adb5';
const dangerColor = '#ff5a1b';

const buttonStyle = {
  borderRadius: 4,
  width: '80%',
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderColor: 'rgba(57, 62, 70, 0.5)',
    borderRadius: 4,
    borderWidth: 1,
    paddingLeft: 5,
  },
  input: {
    height: 40,
    alignSelf: 'stretch',
    flex: 1,
    marginLeft: 3,
    backgroundColor: 'transparent',
    padding: 10,
  },
  floatingButton: {
    right: 30,
    bottom: 30,
    width: 55,
    height: 55,
    backgroundColor: accentColor,
    borderRadius: 28,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addWordButton: {
    backgroundColor: accentColor,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
  },
  buttonGame: {
    backgroundColor: accentColor,
    ...buttonStyle,
  },
  deleteButton: {
    backgroundColor: dangerColor,
    ...buttonStyle,
  },
  buttonGameText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eee',
    justifyContent: 'space-around',
  },
  withBorder: {
    borderColor: 'rgba(57, 62, 70, 0.5)',
    borderWidth: 1,
    borderRadius: Dimensions.get('window').width * 0.5,
  },
});

export default styles;
