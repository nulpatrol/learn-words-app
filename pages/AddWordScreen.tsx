import React, { Component, ReactNode } from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInputFocusEventData,
} from 'react-native';

import { NavigationParams } from 'react-navigation';
import WordInput from '../components/WordInput';
import styles from '../styles/styles';
import { Database } from '../Database';
import { WordRepository } from '../src/Repositories/WordRepository';
import { LanguageRepository } from '../src/Repositories/LanguageRepository';
import { Word } from '../src/Entities/Word';

type Props = {
    navigation: NavigationParams;
};

type Translations = {[key: string]: string};
type Language = {
    key: string;
}
type AddWordScreenState = {
    languages: Array<Language>;
    translations: Translations;
};

export default class AddWordScreen extends Component<Props> {
  state: AddWordScreenState = {
    languages: [],
    translations: {},
  };

  db = Database.getConnection();

  componentDidMount(): void {
    this.update();
  }

  async update() {
    LanguageRepository.all().then((result: Array<Language>) => {
      this.setState(() => ({ languages: result }));
    });
  }

  onBlur = (lang: string, event: React.BaseSyntheticEvent<TextInputFocusEventData>): void => {
    const { text } = event.nativeEvent;

    this.setState((prevState: AddWordScreenState) => ({
      translations: { ...prevState.translations, [lang]: text },
    }));
  };

  addWord = async (): Promise<void> => {
    const wordRepository = new WordRepository();
    const { translations } = this.state;

    const wordMap = new Map();
    Object.keys(translations).forEach((key) => {
      wordMap.set(key, translations[key]);
    });
    await wordRepository.store(Word.fromMap(wordMap));

    const { navigation } = this.props;
    navigation.goBack();
  };

  render(): ReactNode {
    const { languages } = this.state;
    const inputs = languages.map(({ key }: Language) => (
      <WordInput
        key={key}
        lang={key}
        onBlur={(e): void => this.onBlur(key, e)}
      />
    ));

    return (
      <SafeAreaView style={styles.container}>
        {inputs}
        <TouchableOpacity
          onPress={this.addWord}
          style={styles.addWordButton}
        >
          <Text style={{ color: '#fff' }}>Save translations!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
