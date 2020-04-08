import { execute, processQuery } from '../../Database';
import * as queries from '../SQLQueries';
import { DbWord } from '../Types';

export class LanguageRepository {
  static async all(): Promise<Array<DbWord>> {
    const [{ rows }] = await execute([{ sql: queries.GET_LANGUAGES, args: [] }]);

    return <Array<DbWord>>rows;
  }
}
