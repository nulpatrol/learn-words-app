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
    justifyContent: 'space-between',
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
  key: string,
  value: string,
}

const getSelectedItem = ({ items, key, value }: SelectedItem) => {
  let idx = items
    .findIndex(item => (item.key && key) ? item.key === key : item.value === value);
  if (idx === -1) {
    idx = 0;
  }
  return items[idx] || {};
};

const renderPickerItems = (items: Array<Item>) => {
  return items.map(({ key, value, label }) => (
    <Picker.Item
      label={label}
      value={value}
      key={key || label}
    />
  ));
};

type Item = {
  label: string,
  value: string,
  key: string,
}

type State = {
  items: Array<Item>,
  selectedItem: Item,
  showPicker: boolean,
  doneDepressed: boolean,
}

type ChoiceProps = {
  value: string,
  disabled: boolean,
  itemKey: string,
  doneText: string,
  onValueChange: Function,
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
    textInputProps: {},
    pickerProps: {},
    touchableDoneProps: {},
    touchableWrapperProps: {},
  };

  constructor(props: ChoiceProps) {
    super(props);

    const { items } = props;

    const selectedItem = getSelectedItem({
      items,
      key: props.itemKey,
      value: props.value,
    });

    this.state = {
      items,
      selectedItem,
      showPicker: false,
      doneDepressed: false,
    };
  }

  onValueChange = (value: string, index: number) => {
    const { onValueChange } = this.props;

    onValueChange(value, index);

    this.setState((prevState) => ({ selectedItem: prevState.items[index] }));
  };

  togglePicker = (postToggleCallback: Function | undefined) => {
    const { disabled } = this.props;
    const { showPicker } = this.state;

    if (disabled) return;

    if (!showPicker) {
      Keyboard.dismiss();
    }

    this.setState(
      (prevState) => ({ showPicker: !prevState.showPicker }),
      () => postToggleCallback && postToggleCallback(),
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

  render() {
    const { pickerProps, touchableWrapperProps, textInputProps, items } = this.props;
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
              {renderPickerItems(items)}
            </Picker>
          </View>
        </Modal>
      </View>
    );
  }
}
