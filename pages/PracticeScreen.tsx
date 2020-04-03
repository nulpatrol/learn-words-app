import React, {Component} from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Text
} from 'react-native';

import styles from '../styles/styles';
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationParams } from 'react-navigation';
import AddWordScreen from "./AddWordScreen";

type Props = {
    navigation: NavigationParams,
};

class PracticeScreen extends Component<Props> {
    render() {
        return (
            <SafeAreaView style={styles.gameContainer}>
                {
                    [
                        'Choose word',
                        'Choose translation',
                        'Match words',
                        'Listen and choose',
                        'Write word',
                        'Listen and choose',
                    ].map((text, i) =>
                        <TouchableOpacity
                            key={i}
                            onPress={() => this.props.navigation.navigate('newWordScreen')}
                            style={styles.buttonGame}
                        >
                            <Text style={styles.buttonGameText}>{text}</Text>
                        </TouchableOpacity>
                    )
                }
            </SafeAreaView>
        );
    }
}

export default createStackNavigator(
    {
        practiceScreen: {
            screen: PracticeScreen,
            navigationOptions: {
                headerTitle: 'Practice',
            },
        },
        newWordScreen: {
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
