import { execute, processQuery } from '../../Database';
import { Word } from '../Entities/Word';
import * as queries from '../SQLQueries';
import { WordInfo } from '../Types';

const NEW_WORD_KNOWLEDGE_LEVEL = 0;

export class WordRepository {
  static async store(word: Word): Promise<void> {
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

  static async getWithTranslation(): Promise<Array<WordInfo>> {
    const [{ rows }] = await execute([{ sql: queries.GET_WORDS, args: [] }]);

    return rows as Array<WordInfo>;
  }

  static async truncate(): Promise<number> {
    await processQuery(queries.DROP_ALL_TRANSLATIONS, []);
    const { rowsAffected } = await processQuery(queries.DROP_ALL_WORDS, []);

    return rowsAffected;
  }
}
