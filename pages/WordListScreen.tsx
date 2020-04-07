import React, { Component, ReactNode } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { ListItem } from 'react-native-elements';
// @ts-ignore
import { CircularProgress } from 'react-native-svg-circular-progress';
import * as Speech from 'expo-speech';
import { NavigationEventSubscription, NavigationParams } from 'react-navigation';
import AddWordScreen from './AddWordScreen';
import styles from '../styles/styles';
import { WordRepository } from '../src/Repositories/WordRepository';
import type { DbWord } from '../src/Types';

type Props = {
    navigation: NavigationParams;
};

type WordListScreenState = {
    words: Array<DbWord>;
};

const innerStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#e6e6e6',
  },
});

class WordListScreen extends Component<Props> {
  state: WordListScreenState = {
    words: [],
  };

  subs: Array<NavigationEventSubscription> = [];

  componentDidMount(): void {
    this.update();

    const { navigation } = this.props;
    this.subs = [
      navigation.addListener('didFocus', () => this.update()),
    ];
  }

  componentWillUnmount(): void {
    this.subs.forEach(sub => sub.remove());
  }

  update(): void {
    const wordsRepository = new WordRepository();
    wordsRepository.getWithTranslation().then((result: Array<DbWord>) => {
      this.setState(() => ({
        words: result,
      }));
    });
  }

  calculateDonut(level: number): string {
    if (level > 66) return '#2E8B57';
    if (level > 33) return '#e6e600';
    return '#DC3023';
  }

  render(): ReactNode {
    const { words } = this.state;
    const { navigation } = this.props;

    return (
      <SafeAreaView style={innerStyles.container}>
        <StatusBar barStyle="light-content" />
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
                  language: 'uk',
                })}
              />
            ))
          }
        </ScrollView>

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={(): void => navigation.navigate('addWordScreen')}
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

export default createStackNavigator(
  {
    wordListScreen: {
      screen: WordListScreen,
      navigationOptions: (): NavigationStackOptions => ({
        title: 'Word list',
      }),
    },
    addWordScreen: {
      screen: AddWordScreen,
      navigationOptions: (): NavigationStackOptions => ({
        title: 'Add new word',
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#222831',
      },
      headerTintColor: '#ffffff',
    },
  },
);
