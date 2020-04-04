import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { NavigationParams } from 'react-navigation';
import WordInput from '../components/WordInput';
import styles from '../styles/styles';
import { Database } from '../Database';
import { WordRepository } from '../src/Repositories/WordRepository';
import { Word } from '../src/Models/Word';

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
    languages: [
      {
        key: 'en',
      },
      {
        key: 'fr',
      },
      {
        key: 'ru',
      },
    ],
    translations: {},
  };

  db = Database.getConnection();

  componentDidMount(): void {
    // this.update();
  }

  // async update() {
  //   await execute(
  //     [{sql: `select * from languages`, args: []}],
  //     false,
  //     (error, result) => {
  //         if (!error) {
  //             return resolve(result)
  //         }
  //
  //         reject(error)
  //     }
  //   );
  //
  //   this.setState({ languages: _array });
  // }

  onBlur = (lang: string, event: React.BaseSyntheticEvent<any>): void => {
    const { text } = event.nativeEvent;

    this.setState((prevState: AddWordScreenState) => ({
      translations: { ...prevState.translations, [lang]: text },
    }));
  };

  addWorld = async (): Promise<void> => {
    const wordRepository = new WordRepository();
    const {
      translations: {
        en, de, pl, uk, da,
      },
    } = this.state;
    const { navigation } = this.props;
    await wordRepository.store(
      Word.fromMap(
        new Map([
          ['en', en],
          ['de', de],
          ['pl', pl],
          ['uk', uk],
          ['da', da],
        ]),
      ),
    );
    navigation.goBack();
  };

  render() {
    const { languages } = this.state;
    const inputs = languages.map(({ key }) => (
      <WordInput
        key={key}
        lang={key}
        onBlur={({ e }: any): void => this.onBlur(key, e)}
      />
    ));

    return (
      <SafeAreaView style={styles.container}>
        {inputs}
        <TouchableOpacity
          onPress={this.addWorld}
          style={styles.addWordButton}
        >
          <Text style={{ color: '#fff' }}>Save translations!</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
