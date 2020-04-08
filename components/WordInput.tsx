import React, { memo, FC } from 'react';
import {
  NativeSyntheticEvent, TextInput, TextInputFocusEventData, View,
} from 'react-native';
import styles from '../styles/styles';
import { FlagIcon } from './FlagIcon';

type WordInputProps = {
    lang: string;
    onChange: Function;
};

const WordInput: FC<WordInputProps> = (props: WordInputProps) => {
  const { lang, onChange } = props;
  return (
    <View style={styles.searchSection}>
      <View style={styles.withBorder}>
        <FlagIcon width={24} height={24} type={lang} />
      </View>
      <TextInput
        style={styles.input}
        onChange={
            (e: NativeSyntheticEvent<TextInputFocusEventData>): void => onChange(
              lang,
              e.nativeEvent.text,
            )
        }
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
    </View>
  );
};

export default memo(WordInput);
