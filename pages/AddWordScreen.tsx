import React, {
  useMemo, useState, ReactNode, useEffect,
} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { NavigationParams } from 'react-navigation';
import WordInput from '../components/WordInput';
import styles from '../styles/styles';
import { WordRepository } from '../src/Repositories/WordRepository';
import { Word } from '../src/Models/Word';
import { LanguageRepository } from '../src/Repositories/LanguageRepository';
import { DbWord } from '../src/Types';

type Props = {
    navigation: NavigationParams;
};

type Translations = {[key: string]: string};
type Language = {
    key: string;
}

type LanguagesList = Array<Language>

const addWord = async (translations: Translations, navigation: NavigationParams): Promise<void> => {
  const wordRepository = new WordRepository();

  const wordMap = new Map();
  Object.keys(translations).forEach((key) => {
    wordMap.set(key, translations[key]);
  });
  await wordRepository.store(Word.fromMap(wordMap));

  navigation.goBack();
};

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

const AddWordScreen: (props: Props) => void = ({ navigation }) => {
  const [languagesList, setLanguages] = useState<LanguagesList>([]);
  const [translations, addNewWord] = useState<Translations>({});
  const inputsList = useMemo(
    () => getInputsList(languagesList, addNewWord),
    [languagesList, addNewWord],
  );

  useEffect(() => {
    LanguageRepository.all().then((result: Array<DbWord>) => {
      setLanguages(result);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {inputsList}
      <TouchableOpacity
        onPress={(): Promise<void> => addWord(translations, navigation)}
        style={styles.addWordButton}
      >
        <Text style={{ color: '#fff' }}>Save translations!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddWordScreen;
