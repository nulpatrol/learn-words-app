import React, { Component, ReactNode } from 'react';
import {
  SafeAreaView,
  Text, View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationParams } from 'react-navigation';
import { Language } from '../src/Types';
import { LanguageRepository } from '../src/Repositories/LanguageRepository';
import { SettingsRepository } from '../src/Repositories/SettingsRepository';
import CustomButton from '../components/Button';
import Choice from '../components/Choice';
import styles from '../styles/styles';
import { WordRepository } from "../src/Repositories/WordRepository";

type SettingsScreenProps = {
  navigation: NavigationParams;
};

type SettingsScreenState = {
  languages: Array<Language>;
  mainLanguage: string;
  secondaryLanguage: string;
};

class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
  state: Readonly<SettingsScreenState> = {
    languages: [],
    mainLanguage: '',
    secondaryLanguage: '',
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
    LanguageRepository.all().then((result: Array<Language>) => {
      this.setState(() => ({ languages: result }));
    });
    SettingsRepository.get('main_language').then((result: string) => {
      this.setState(() => ({ mainLanguage: result }));
    });
    SettingsRepository.get('secondary_language').then((result: string) => {
      this.setState(() => ({ secondaryLanguage: result }));
    });
  }

  chooseLanguage(chosen: string): void {
    this.setState(() => ({
      mainLanguage: chosen,
    }));
  }

  render(): ReactNode {
    const { languages, mainLanguage, secondaryLanguage } = this.state;
    const preparedLanguages = languages.map(language => ({
      key: language.id,
      label: language.name,
      value: language.key,
    }));

    return (
      <SafeAreaView style={styles.settingsContainer}>
        <Text>Choose main language:</Text>
        <Choice
          onDonePress={({ value }): void => {
            SettingsRepository.set('main_language', value);
          }}
          items={preparedLanguages}
          value={mainLanguage}
        />
        <Text>Choose secondary language:</Text>
        <Choice
          onDonePress={({ value }): void => {
            SettingsRepository.set('secondary_language', value);
          }}
          items={preparedLanguages}
          value={secondaryLanguage}
        />
        <View style={{height: 10}} />
        <CustomButton
          onClick={(): void => {
            WordRepository.truncate();
          }}
          label="Delete all words"
          type="danger"
        />
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
