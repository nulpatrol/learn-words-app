import React, { Component, ReactNode } from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationParams } from 'react-navigation';
import { DbWord } from '../src/Types';
import { LanguageRepository } from '../src/Repositories/LanguageRepository';
import { SettingsRepository } from '../src/Repositories/SettingsRepository';
import CustomButton from '../components/Button';
import Choice from '../components/Choice';
import styles from '../styles/styles';

type SettingsScreenProps = {
  navigation: NavigationParams;
};

type SettingsScreenState = {
  languages: Array<DbWord>;
  mainLanguage: string;
};

class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
  state: Readonly<SettingsScreenState> = {
    languages: [],
    mainLanguage: '',
  };

  subs: Array<Function> = [];

  componentDidMount(): void {
    this.update();
    const { navigation } = this.props;
    this.subs.push(navigation.addListener('didFocus', () => this.update()));
  }

  componentWillUnmount(): void {
    this.subs.forEach(sub => sub());
  }

  update(): void {
    const languagesRepository = new LanguageRepository();
    languagesRepository.all().then((result: Array<DbWord>) => {
      this.setState(() => ({ languages: result }));
    });

    const settingsRepository = new SettingsRepository();
    settingsRepository.get('main_language').then((result: string) => {
      this.setState(() => ({ mainLanguage: result }));
    });
  }

  chooseLanguage(chosen: string): void {
    this.setState(() => ({
      mainLanguage: chosen,
    }));
  }

  render(): ReactNode {
    const { languages, mainLanguage } = this.state;
    const preparedLanguages = languages.map(language => ({
      key: language.id,
      label: language.name,
      value: language.key,
    }));

    return (
      <SafeAreaView style={styles.gameContainer}>

        <Text>Bla</Text>

        <Choice
          onDonePress={({ value }): void => {
            const settingsRepository = new SettingsRepository();
            settingsRepository.set('main_language', value);
          }}
          items={preparedLanguages}
          value={mainLanguage}
        />

        <CustomButton label="Delete all words" type="danger" />
      </SafeAreaView>
    );
  }
}

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
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
