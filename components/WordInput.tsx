import React from 'react';
import {
  NativeSyntheticEvent, TextInput, TextInputFocusEventData, View,
} from 'react-native';
import styles from '../styles/styles';
import { FlagIcon } from './FlagIcon';

type WordInputProps = {
    lang: string;
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

export default function WordInput(props: WordInputProps) {
  const { lang, onBlur } = props;
  return (
    <View style={styles.searchSection}>
      <View style={styles.withBorder}>
        <FlagIcon width={24} height={24} type={lang} />
      </View>
      <TextInput
        style={styles.input}
        onBlur={onBlur}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
    </View>
  );
}
