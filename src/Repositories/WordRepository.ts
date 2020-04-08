import { execute, processQuery } from '../../Database';
import { Word } from '../Entities/Word';
import * as queries from '../SQLQueries';
import { DbWord } from '../Types';

const NEW_WORD_KNOWLEDGE_LEVEL = 0;

export class WordRepository {
  async store(word: Word): Promise<void> {
    console.log('in store', word);
    const { insertId: wordId } = await processQuery(queries.INSERT_WORD);
    const translations = word.getTranslations();

    const promises = Object
      .keys(translations)
      .map(language => processQuery(queries.INSERT_TRANSLATION, [
        translations[language],
        wordId,
        language,
        NEW_WORD_KNOWLEDGE_LEVEL,
      ]));
    await Promise.all(promises);
  }

  async getWithTranslation(): Promise<Array<DbWord>> {
    const [result] = await execute([{ sql: queries.GET_WORDS, args: [] }]);
    // @ts-ignore
    return result.rows;
  }

  static async truncate(): Promise<number> {
    await processQuery(queries.DROP_ALL_TRANSLATIONS, []);
    const { rowsAffected } = await processQuery(queries.DROP_ALL_WORDS, []);

    return rowsAffected;
  }
}
