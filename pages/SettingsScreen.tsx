import React, {Component, ReactNode} from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
// @ts-ignore
import {NavigationParams} from 'react-navigation';
import {DbWord} from "../src/Types";
import {LanguageRepository} from "../src/Repositories/LanguageRepository";
import CustomButton from '../components/Button';
import Choice from "../components/Choice";
import styles from '../styles/styles';

type SettingsScreenProps = {
  navigation: NavigationParams;
};

type SettingsScreenState = {
  modalIsVisible: boolean,
  languages: Array<object>,
  chosenLanguage: string,
};

class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
  state = {
    modalIsVisible: true,
    languages: [],
    chosenLanguage: 'de',
  };

  componentDidMount(): void {
    this.update();
  }

  update(): void {
    const languagesRepository = new LanguageRepository();
    languagesRepository.all().then((result: Array<DbWord>) => {
      console.log(result);
      this.setState(() => ({
        languages: result,
      }));
    });
  }

  chooseLanguage(chosen) {
    this.setState(() => ({
      chosenLanguage: chosen,
    }));
  }

  languageChosen() {
    console.log(this.state.chosenLanguage);
  }

  render(): ReactNode {
    const { languages } = this.state;
    const preparedLanguages = languages.map(language => ({
      key: language.id,
      label: language.name,
      value: language.key,
    }));

    console.log(preparedLanguages);

    return (
      <SafeAreaView style={styles.gameContainer}>
        <StatusBar barStyle="light-content"/>

        <Choice onValueChange={() => {}} items={preparedLanguages} value={'fr'} />

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
