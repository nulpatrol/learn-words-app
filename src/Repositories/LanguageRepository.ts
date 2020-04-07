import { execute, processQuery } from '../../Database';
import { Word } from '../Models/Word';
import * as queries from '../SQLQueries';
import { DbWord } from '../Types';

export class LanguageRepository {
  async all(): Promise<Array<DbWord>> {
    const [result] = await execute([{ sql: queries.GET_LANGUAGES, args: [] }]);
    // @ts-ignore
    return result.rows;
  }
}
