import React, {Component} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { ListItem } from 'react-native-elements';
// @ts-ignore
import { CircularProgress } from 'react-native-svg-circular-progress';
import AddWordScreen from "./AddWordScreen";
import styles from '../styles/styles';
import * as Speech from "expo-speech";
import { WordRepository } from "../src/Repositories/WordRepository";
import {NavigationParams} from "react-navigation";
import type { DbWord } from '../src/Types';

type Props = {
    navigation: NavigationParams,
};

type WordListScreenState = {
    words: Array<DbWord>,
};

class WordListScreen extends Component<Props> {
    state: WordListScreenState = {
        words: [],
    };

    subs = [];

    componentDidMount() {
        this.update();

        /*this.subs = [
            this.props.navigation.addListener('didFocus', () => this.update()),
        ];*/
    }

    componentWillUnmount() {
        //this.subs.forEach(sub => sub.remove());
    }

    update() {
        const wordsRepository = new WordRepository();
        wordsRepository.getWithTranslation().then((result: Array<DbWord>) => {
            this.setState(() => ({
                words: [ ...result ],
            }));
        });
    }

    calculateDonut(level: Number) {
        if (level > 66) return '#2E8B57';
        if (level > 33) return '#e6e600';
        return '#DC3023';
    }

    render() {
        return (
            <SafeAreaView style={innerStyles.container}>
                <StatusBar barStyle="light-content" />
                <ScrollView>
                    {
                        this.state.words.map((l, i) => (
                            <ListItem
                                key={i}
                                // @ts-ignore
                                leftElement={
                                    () => <CircularProgress
                                        size={30}
                                        progressWidth={10}
                                        percentage={l.level}
                                        donutColor={this.calculateDonut(l.level)}
                                    />
                                }
                                title={l.main_value}
                                titleStyle={{fontWeight: 'bold'}}
                                subtitle={l.second_value}
                                onPress={() => Speech.speak(l.main_value, {
                                    language: 'fr'
                                })}
                            />
                        ))
                    }
                </ScrollView>

                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => this.props.navigation.navigate('addWordScreen')}
                >
                    <Text style={{color: '#fff', fontSize: 26, fontWeight: 'bold', lineHeight: 27}}>
                        +
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const innerStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#e6e6e6',
    },
});

export default createStackNavigator(
    {
        wordListScreen: {
            screen: WordListScreen,
            navigationOptions: () => ({
                title: 'Word list',
            }),
        },
        addWordScreen: {
            screen: AddWordScreen,
            navigationOptions: () => ({
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
    }
);
