import { execute, processQuery } from '../../Database';
import { Word } from '../Models/Word';
import * as queries from '../SQLQueries';
import {DbWord} from "../Types";

const NEW_WORD_KNOWLEDGE_LEVEL: number = 0;

export class WordRepository  {
    async store(word: Word) {
        const { insertId: wordId } = await processQuery(queries.INSERT_WORD);
        const translations = word.getTranslations();

        const promises = Object.keys(translations).map(async (language) => {
            await processQuery(queries.INSERT_TRANSLATION, [
                translations[language],
                wordId,
                language,
                NEW_WORD_KNOWLEDGE_LEVEL,
            ]);
        });
        await Promise.all(promises);
    }

    async getWithTranslation(): Promise<Array<DbWord>> {
        return new Promise(async (resolve) => {
            let [ result ] = await execute([{ sql: queries.GET_WORDS, args: [] }]);

            // @ts-ignore
            resolve(result.rows);
        });
    }
}
