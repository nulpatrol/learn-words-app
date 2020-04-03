import React, { Component } from 'react';
import {
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';

import WordInput from '../components/WordInput';
import styles from '../styles/styles';
import { Database, execute } from '../Database';
import { WordRepository } from '../src/Repositories/WordRepository';
import { Word } from '../src/Models/Word';
import {NavigationParams} from "react-navigation";

type Props = {
    navigation: NavigationParams,
};

type Translations = {[key:string]: string};
type Language = {
    key: string,
}
type AddWordScreenState = {
    languages: Array<Language>,
    translations: Translations,
};

export default class AddWordScreen extends Component<Props> {
    state: AddWordScreenState = {
        languages: [],
        translations: {},
    };
    db = Database.getConnection();

    componentDidMount() {
        //this.update();
    }

    async update() {
        /*await execute(
            [{sql: `select * from languages`, args: []}],
            false,
            (error, result) => {
                if (!error) {
                    return resolve(result)
                }

                reject(error)
            }
        );*/

        //this.setState({ languages: _array });
    }

    render() {
        const inputs = this.state.languages.map(({key}) =>
            <WordInput
                key={key}
                lang={key}
                onBlur={(e: any) => this.onBlur(key, e)}
            />
        );

        return (
            <SafeAreaView style={styles.container}>
                {inputs}
                <TouchableOpacity
                    onPress={this.addWorld.bind(this)}
                    style={styles.addWordButton}
                >
                    <Text style={{color: '#fff'}}>Click me!</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    onBlur(lang: string, event: React.BaseSyntheticEvent<any>) {
        const { text } = event.nativeEvent;

        this.setState((prevState: AddWordScreenState) => ({
            translations: { ...prevState.translations, [lang]: text },
        }));
    }

    async addWorld() {
        const wordRepository = new WordRepository();
        await wordRepository.store(
            Word.fromMap(
                new Map([
                    ['en', this.state.translations.en],
                    ['de', this.state.translations.de],
                    ['pl', this.state.translations.pl],
                    ['uk', this.state.translations.uk],
                    ['da', this.state.translations.da],
                ])
            )
        );
        this.props.navigation.goBack();
    }
}
