import React, { memo, ReactNode } from 'react';
import {
  SafeAreaView,
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationParams } from 'react-navigation';
import styles from '../styles/styles';
import Button from '../components/Button';

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
        ].map(text => (
          <Button
            key={text.replace(' ', '_')}
            type="game"
            onClick={(): void => navigation.navigate('newWordScreen')}
            label={text}
          />
        ))
      }
    </SafeAreaView>
  );
});

export default (): ReactNode => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#222831',
        },
        headerTintColor: '#ffffff',
      }}
    >
      <Stack.Screen name="Practice" component={PracticeScreen} />
    </Stack.Navigator>
  );
};
