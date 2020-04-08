import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import styles from '../styles/styles';

type ButtonProps = {
  onClick: (e: GestureResponderEvent) => void;
  label: string;
  type: string;
};

export default function Button(props: ButtonProps): ReactNode {
  const { onClick, label, type } = props;

  const mapping: { [key: string]: StyleProp<ViewStyle> } = {
    game: styles.buttonGame,
    danger: styles.deleteButton,
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      style={mapping[type]}
    >
      <Text style={styles.buttonGameText}>{label}</Text>
    </TouchableOpacity>
  );
}
