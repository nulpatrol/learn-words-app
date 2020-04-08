import React, { Component, ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WordListScreen from './pages/WordListScreen';
import PracticeScreen from './pages/PracticeScreen';
import migrate from './models/migration';
import SettingsScreen from './pages/SettingsScreen';

class App extends Component {
  state = {
    migrated: false,
  };

  componentDidMount(): void {
    migrate().then(() => {
      this.setState(() => ({ migrated: true }));
    });
  }

  render(): ReactNode {
    const { migrated } = this.state;
    if (!migrated) return null;

    const Tab = createBottomTabNavigator();
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#00adb5',
            inactiveTintColor: '#393e46',
          }}
        >
          <Tab.Screen
            name="Word list"
            component={WordListScreen}
            options={{
              tabBarLabel: 'Word list',
              tabBarIcon: ({ color, size }): ReactNode => (
                <FontAwesome name="book" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Practice"
            component={PracticeScreen}
            options={{
              tabBarLabel: 'Practice',
              tabBarIcon: ({ color, size }): ReactNode => (
                <FontAwesome name="cogs" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }): ReactNode => (
                <FontAwesome name="graduation-cap" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
