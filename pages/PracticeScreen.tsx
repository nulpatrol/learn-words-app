import React, { memo } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';

import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { NavigationParams } from 'react-navigation';
import styles from '../styles/styles';
import AddWordScreen from './AddWordScreen';

type Props = {
    navigation: NavigationParams;
};

const PracticeScreen = memo((props: Props) => {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.gameContainer}>
      {
        [
          'Choose word',
          'Choose translation',
          'Match words',
          'Listen and choose',
          'Write word',
          'Listen and choose',
        ].map((text) => (
          <TouchableOpacity
            key={text.replace(' ', '_')}
            onPress={(): void => navigation.navigate('newWordScreen')}
            style={styles.buttonGame}
          >
            <Text style={styles.buttonGameText}>{text}</Text>
          </TouchableOpacity>
        ))
      }
    </SafeAreaView>
  );
});

export default createStackNavigator(
  {
    practiceScreen: {
      screen: PracticeScreen,
      navigationOptions: {
        headerTitle: 'Practice',
      },
    },
    newWordScreen: {
      screen: AddWordScreen,
      navigationOptions: (): NavigationStackOptions => ({
        title: 'Add new word',
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#222831',
      },
      headerTintColor: '#ffffff',
    },
  },
);
