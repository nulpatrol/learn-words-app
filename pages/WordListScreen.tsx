import React, { Component, ReactNode } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem } from 'react-native-elements';
// @ts-ignore
import { CircularProgress } from 'react-native-svg-circular-progress';
import * as Speech from 'expo-speech';
import { NavigationEventSubscription, NavigationParams } from 'react-navigation';
import AddWordScreen from './AddWordScreen';
import styles from '../styles/styles';
import { WordRepository } from '../src/Repositories/WordRepository';
import type { DbWord } from '../src/Types';
import { SettingsRepository } from "../src/Repositories/SettingsRepository";

type Props = {
    navigation: NavigationParams;
};

type WordListScreenState = {
    words: Array<DbWord>;
    mainLanguage: string;
};

const innerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
});

class WordListScreen extends Component<Props> {
  state: WordListScreenState = {
    words: [],
    mainLanguage: '',
  };

  subs: Array<Function> = [];

  componentDidMount(): void {
    this.update();

    const { navigation } = this.props;
    this.subs = [
      navigation.addListener('focus', () => this.update()),
      navigation.addListener('blur', () => this.setState(() => ({ words: [] }))),
    ];
  }

  componentWillUnmount(): void {
    this.subs.forEach(sub => sub());
  }

  update(): void {
    const wordsRepository = new WordRepository();
    wordsRepository.getWithTranslation().then((result: Array<DbWord>) => {
      this.setState(() => ({
        words: result,
      }));
    });
    SettingsRepository.get('main_language').then((result: string) => {
      this.setState(() => ({ mainLanguage: result }));
    });
  }

  calculateDonut(level: number): string {
    if (level > 66) return '#2E8B57';
    if (level > 33) return '#e6e600';
    return '#DC3023';
  }

  render(): ReactNode {
    const { words, mainLanguage } = this.state;
    const { navigation } = this.props;

    return (
      <SafeAreaView style={innerStyles.container}>
        <ScrollView>
          {
            words.map((l, i) => (
              <ListItem
                key={i}
                    // @ts-ignore
                leftElement={
                  (): ReactNode => (
                    <CircularProgress
                      size={30}
                      progressWidth={10}
                      percentage={l.level}
                      donutColor={this.calculateDonut(l.level)}
                    />
                  )
                }
                title={l.main_value}
                titleStyle={{ fontWeight: 'bold' }}
                subtitle={l.second_value}
                onPress={(): void => Speech.speak(l.main_value, {
                  language: mainLanguage,
                })}
              />
            ))
          }
        </ScrollView>

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={(): void => navigation.navigate('AddWordScreen')}
        >
          <Text style={{
            color: '#fff', fontSize: 26, fontWeight: 'bold', lineHeight: 27,
          }}
          >
            +
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#222831',
        },
        headerTintColor: '#ffffff',
      }}
    >
      <Stack.Screen name="Word list" component={WordListScreen} />
      <Stack.Screen
        name="AddWordScreen"
        component={AddWordScreen}
        options={{ title: 'New word' }} />
    </Stack.Navigator>
  )
};
