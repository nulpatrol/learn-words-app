import React, { PureComponent } from 'react';
import {
  Keyboard,
  Modal,
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const defaultStyles = StyleSheet.create({
  viewContainer: {
    width: '95%',
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    top: 10,
  },
  modalViewTop: {
    flex: 1,
  },
  modalViewMiddle: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#dedede',
    zIndex: 2,
  },
  done: {
    color: '#007aff',
    fontWeight: '600',
    fontSize: 17,
    paddingTop: 1,
    paddingRight: 11,
  },
  doneDepressed: {
    fontSize: 19,
  },
  modalViewBottom: {
    justifyContent: 'center',
    backgroundColor: '#d0d4da',
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
});

type SelectedItem = {
  items: Array<Item>,
  value: string,
}

const getSelectedItem = ({ items, value }: SelectedItem) => {
  let idx = items.findIndex(item => item.value === value);
  if (idx === -1) {
    idx = 0;
  }
  return items[idx] || {};
};

type Item = {
  label: string,
  value: string,
  key: number,
}

type State = {
  selectedItem: Item,
  showPicker: boolean,
  doneDepressed: boolean,
}

type ChoiceProps = {
  value: string,
  disabled: boolean,
  doneText: string,
  onValueChange: Function | undefined,
  onDonePress: Function | undefined,
  items: Array<Item>,
  textInputProps: object,
  pickerProps: object,
  touchableDoneProps: object,
  touchableWrapperProps: object,
}

export default class Choice extends PureComponent<ChoiceProps, State> {
  static defaultProps = {
    value: undefined,
    disabled: false,
    itemKey: null,
    doneText: 'Done',
    onDonePress: undefined,
    onValueChange: undefined,
    textInputProps: {},
    pickerProps: {},
    touchableDoneProps: {},
    touchableWrapperProps: {},
  };

  constructor(props: ChoiceProps) {
    super(props);

    this.state = {
      selectedItem: {
        value: '',
        key: 0,
        label: '',
      },
      showPicker: false,
      doneDepressed: false,
    };
  }

  componentDidUpdate(prevProps: Readonly<ChoiceProps>, prevState: Readonly<State>): void {
    const { items, value } = this.props;
    if (items === prevProps.items && value === prevProps.value) return;

    const selectedItem = getSelectedItem({
      items,
      value,
    });
    this.setState(() => ({ selectedItem }))
  }

  onValueChange = (value: string, index: number) => {
    const { onValueChange, items } = this.props;

    if (onValueChange) onValueChange(value, index);

    this.setState(() => ({ selectedItem: items[index] }));
  };

  togglePicker = (postToggleCallback: Function | undefined) => {
    const { disabled } = this.props;
    const { showPicker, selectedItem } = this.state;

    if (disabled) return;

    if (!showPicker) {
      Keyboard.dismiss();
    }

    this.setState(
      (prevState) => ({ showPicker: !prevState.showPicker }),
      () => postToggleCallback && postToggleCallback(selectedItem),
    );
  };

  renderInputAccessoryView = () => {
    const {
      doneText,
      onDonePress,
      touchableDoneProps,
    } = this.props;

    const { doneDepressed } = this.state;

    return (
      <View style={defaultStyles.modalViewMiddle}>
        <TouchableOpacity
          onPress={() => {
            this.togglePicker(onDonePress);
          }}
          onPressIn={() => {
            this.setState({ doneDepressed: true });
          }}
          onPressOut={() => {
            this.setState({ doneDepressed: false });
          }}
          hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
          {...touchableDoneProps}
        >
          <View>
            <Text
              allowFontScaling={false}
              style={[
                defaultStyles.done,
                doneDepressed ? defaultStyles.doneDepressed : {},
              ]}
            >
              {doneText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderPickerItems = () => {
    const { items } = this.props;

    return items.map(({ key, value, label }) => (
      <Picker.Item
        label={label}
        value={value}
        key={key}
      />
    ));
  };

  render() {
    const { pickerProps, touchableWrapperProps, textInputProps } = this.props;
    const { selectedItem, showPicker } = this.state;

    return (
      <View style={defaultStyles.viewContainer}>
        <TouchableOpacity
          onPress={() => this.togglePicker(undefined)}
          activeOpacity={1}
          {...touchableWrapperProps}
        >
          <View pointerEvents="box-only">
            <TextInput
              value={selectedItem.label}
              style={defaultStyles.input}
              editable={false}
              {...textInputProps}
            />
            <View
              style={defaultStyles.iconContainer}
            >
              <FontAwesome name="angle-down" size={24} color="gray" />
            </View>
          </View>
        </TouchableOpacity>
        <Modal
          transparent
          visible={showPicker}
          animationType='slide'
        >
          <TouchableOpacity
            style={defaultStyles.modalViewTop}
            onPress={() => this.togglePicker(undefined)}
          />
          {this.renderInputAccessoryView()}
          <View
            style={[
              defaultStyles.modalViewBottom,
              { height: 215 },
            ]}
          >
            <Picker
              onValueChange={this.onValueChange}
              selectedValue={selectedItem.value}
              {...pickerProps}
            >
              {this.renderPickerItems()}
            </Picker>
          </View>
        </Modal>
      </View>
    );
  }
}
