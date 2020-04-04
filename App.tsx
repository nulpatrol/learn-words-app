import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WordListScreen from './pages/WordListScreen';
import PracticeScreen from './pages/PracticeScreen';
import migrate from './models/migration';

const AppNavigator = createBottomTabNavigator(
  {
    WordListScreen: {
      screen: WordListScreen,
      navigationOptions: {
        title: 'Words list',
      },
    },
    PracticeScreen: {
      screen: PracticeScreen,
      navigationOptions: {
        title: 'Practice',
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        const icons: {[key: string]: string} = {
          WordListScreen: 'book',
          PracticeScreen: 'graduation-cap',
        };

        return (
          <FontAwesome
            name={icons[routeName]}
            size={25}
            color={tintColor}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#00adb5',
      inactiveTintColor: '#393e46',
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  state = {
    migrated: false,
  };

  componentDidMount() {
    migrate().then(() => {
      this.setState(() => ({ migrated: true }));
    });
  };

  render() {
    const { migrated } = this.state;
    if (!migrated) return null;

    return (
      <AppContainer />
    );
  }
}

export default App;
