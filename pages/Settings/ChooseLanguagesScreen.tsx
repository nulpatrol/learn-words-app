import React, { Component, ReactNode } from 'react';
import {
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { NavigationParams } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Language } from '../../src/Types';
import { LanguageRepository } from '../../src/Repositories/LanguageRepository';
import CustomButton from '../../components/Button';

const innerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
});

type ChooseLanguagesScreenProps = {
  navigation: NavigationParams;
};

type ChooseLanguagesScreenState = {
  languages: Array<Language>;
};

export default class ChooseLanguagesScreen extends Component<
  ChooseLanguagesScreenProps,
  ChooseLanguagesScreenState
> {
  state: Readonly<ChooseLanguagesScreenState> = {
    languages: [],
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
  }

  toogleLanguage(isActive: boolean, id: string) {
    LanguageRepository.activate(id, isActive);
  }

  renderButton({ active, id }) {
    if (active) {
      return (
        <CustomButton
          label="enable"
          type="game"
          customStyles={{
            width: '20%',
            borderWidth: 1,
            borderColor: '#00adb5',
            backgroundColor: 'white',
            height: 30,
          }}
          customTextStyles={{
            color: '#00adb5',
            fontWeight: '300',
          }}
          onClick={() => this.toogleLanguage(false, id)}
        />
      );
    }

    return (
      <CustomButton
        label="disable"
        type="game"
        customStyles={{
          width: '20%',
          borderWidth: 1,
          borderColor: '#ff5a1b',
          backgroundColor: 'white',
          height: 30,
        }}
        customTextStyles={{
          color: '#ff5a1b',
          fontWeight: '300',
        }}
        onClick={() => this.toogleLanguage(true, id)}
      />
    );
  }

  render(): ReactNode {
    const { languages } = this.state;

    return (
      <SafeAreaView style={innerStyles.container}>
        {
          languages.map(language => (
            <ListItem
              key={language.id}
              title={language.name}
              titleStyle={{ fontWeight: 'bold' }}
              rightElement={() => this.renderButton(language)}
            />
          ))
        }
      </SafeAreaView>
    );
  }
}
