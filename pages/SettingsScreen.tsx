import React, {Component, ReactNode} from 'react';
import {
  SafeAreaView,
  StatusBar, Text,
} from 'react-native';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
// @ts-ignore
import {NavigationParams} from 'react-navigation';
import {DbWord} from "../src/Types";
import { LanguageRepository } from '../src/Repositories/LanguageRepository';
import { SettingsRepository } from '../src/Repositories/SettingsRepository';
import CustomButton from '../components/Button';
import Choice from "../components/Choice";
import styles from '../styles/styles';

type SettingsScreenProps = {
  navigation: NavigationParams;
};

type SettingsScreenState = {
  modalIsVisible: boolean,
  languages: Array<object>,
  mainLanguage: string,
};

class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
  state = {
    modalIsVisible: true,
    languages: [],
    mainLanguage: '',
  };

  componentDidMount(): void {
    this.update();
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

  chooseLanguage(chosen: string) {
    this.setState(() => ({
      mainLanguage: chosen,
    }));
  }

  languageChosen() {
    console.log(this.state.mainLanguage);
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
        <StatusBar barStyle="light-content"/>

        <Text>Bla</Text>

        <Choice onDonePress={({ value }) => {
          const settingsRepository = new SettingsRepository();
          settingsRepository.set('main_language', value);
        }} items={preparedLanguages} value={mainLanguage} />

        <CustomButton label={"Delete all words"} onClick={()=>{}} type={'danger'} />
      </SafeAreaView>
    );
  }
}

export default createStackNavigator(
  {
    settingsScreen: {
      screen: SettingsScreen,
      navigationOptions: (): NavigationStackOptions => ({
        title: 'Settings',
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
