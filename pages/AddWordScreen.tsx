import React, {
  useMemo, useState, useEffect, ReactNode,
} from 'react';
import { connect, useSelector } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { NavigationParams } from 'react-navigation';
import WordInput from '../components/WordInput';
import { WordRepository } from '../src/Repositories/WordRepository';
import { Word } from '../src/Entities/Word';
import { LanguageRepository } from '../src/Repositories/LanguageRepository';
import { Language } from '../src/Types';

import styles from '../styles/styles';
import { AppState } from '../src/Store/state';

type Props = {
    navigation: NavigationParams;
};

type Translations = {[key: string]: string};

type LanguagesList = Array<Language>

const addWord = async (translations: Translations, navigation: NavigationParams): Promise<void> => {
  const wordMap = new Map();
  Object.keys(translations).forEach((key) => {
    wordMap.set(key, translations[key]);
  });
  await WordRepository.store(Word.fromMap(wordMap));

  navigation.goBack();
};

const getInputsList = (
  languagesList: LanguagesList,
  onTextChange: Function,
): Array<ReactNode> => languagesList.map(({ key }: Language) => (
  <WordInput
    key={key}
    lang={key}
    onChange={
      (newWord: string): void => onTextChange(
        (prevState: Translations) => ({ ...prevState, [key]: newWord }),
      )
    }
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
    LanguageRepository.active().then((result: Array<Language>) => {
      setLanguages(result);
    });
  }, []);

  const counter = useSelector(state => state.id);

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
