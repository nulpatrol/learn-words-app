import React, { useMemo, useState, ReactNode, useEffect } from 'react';
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

type LanguagesList = Array<Language>

const getInputsList = (
  languagesList: LanguagesList,
  onTextChange: Function,
): Array<ReactNode> => languagesList.map(({ key }: Language) => (
  <WordInput
    key={key}
    lang={key}
    onChange={onTextChange}
  />
));

const AddWordScreen: (props: Props) => void = (props: Props) => {
  const [languagesList, setLanguages] = useState<LanguagesList>([]);
  const [translations, addNewWord] = useState<Translations>({});
  const inputsList = useMemo(
    () => getInputsList(languagesList, addNewWord),
    [languagesList, addNewWord],
  );

  useEffect(async () => {
    LanguageRepository.all().then((result: Array<DbWord>) => {
      setLanguages(result);
    });
  }, []);

  const addWord = async (): Promise<void> => {
    const wordRepository = new WordRepository();

    const wordMap = new Map();
    Object.keys(translations).forEach((key) => {
      wordMap.set(key, translations[key]);
    });
    await wordRepository.store(Word.fromMap(wordMap));

    const { navigation } = props;
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {inputsList}
      <TouchableOpacity
        onPress={addWord}
        style={styles.addWordButton}
      >
        <Text style={{ color: '#fff' }}>Save translations!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddWordScreen;

// export default class AddWordScreen extends Component<Props> {
//   state: AddWordScreenState = {
//     languages: [
//       {
//         key: 'en',
//       },
//       {
//         key: 'fr',
//       },
//       {
//         key: 'ru',
//       },
//     ],
//     translations: {},
//   };
//
//   db = Database.getConnection();
//
//   componentDidMount(): void {
//     // this.update();
//   }
//
//   // async update() {
//   //   await execute(
//   //     [{sql: `select * from languages`, args: []}],
//   //     false,
//   //     (error, result) => {
//   //         if (!error) {
//   //             return resolve(result)
//   //         }
//   //
//   //         reject(error)
//   //     }
//   //   );
//   //
//   //   this.setState({ languages: _array });
//   // }
//
//   onTextChange = (lang: string, text: string): void => {
//     this.setState((prevState: AddWordScreenState) => ({
//       translations: { ...prevState.translations, [lang]: text },
//     }));
//   };
//
//   addWord = async (): Promise<void> => {
//     const wordRepository = new WordRepository();
//     const { translations } = this.state;
//
//     const wordMap = new Map();
//     Object.keys(translations).forEach((key) => {
//       wordMap.set(key, translations[key]);
//     });
//     await wordRepository.store(Word.fromMap(wordMap));
//
//     const { navigation } = this.props;
//     navigation.goBack();
//   };
//
//   getInputsList = (): Array<ReactNode> => {
//     const { languages } = this.state;
//
//     return languages.map(({ key }: Language) => (
//       <WordInput
//         key={key}
//         lang={key}
//         onChange={this.onTextChange}
//       />
//     ));
//   };
//
//   render(): ReactNode {
//     const inputs = this.getInputsList();
//
//     return (
//       <SafeAreaView style={styles.container}>
//         {inputs}
//         <TouchableOpacity
//           onPress={this.addWord}
//           style={styles.addWordButton}
//         >
//           <Text style={{ color: '#fff' }}>Save translations!</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   }
// }
