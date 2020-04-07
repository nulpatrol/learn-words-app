import React from 'react';
import styles from '../styles/styles';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  onClick: (e: GestureResponderEvent) => void,
  label: string,
  type: string,
};

export default function Button(props: ButtonProps) {
  const { onClick, label, type } = props;

  const mapping: any = {
    'game': styles.buttonGame,
    'danger': styles.deleteButton,
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      style={mapping[type]}
    >
      <Text style={styles.buttonGameText}>{label}</Text>
    </TouchableOpacity>
  );
};
