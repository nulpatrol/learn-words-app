import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { memo, FC } from 'react';
import styles from '../styles/styles';

type ButtonProps = {
  onClick: (e: GestureResponderEvent) => void;
  label: string;
  type: string;
};

const Button: FC<ButtonProps> = ({ onClick, label, type }) => {
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
};

export default memo(Button);
