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
  customStyles: StyleProp<ViewStyle>;
  customTextStyles: StyleProp<ViewStyle>;
  label: string;
  type: string;
};

const Button: FC<ButtonProps> = ({ onClick, label, type, customStyles, customTextStyles }) => {
  const mapping: { [key: string]: StyleProp<ViewStyle> } = {
    game: styles.buttonGame,
    danger: styles.deleteButton,
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[mapping[type], customStyles]}
    >
      <Text style={[styles.buttonGameText, customTextStyles]}>{label}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  onClick: () => {},
  customStyles: {},
  customTextStyles: {},
};

export default memo(Button);
