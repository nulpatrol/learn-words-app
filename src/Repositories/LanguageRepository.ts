import { execute } from '../../Database';
import * as queries from '../SQLQueries';
import { Language } from '../Types';

export class LanguageRepository {
  static async all(): Promise<Array<Language>> {
    const [{ rows }] = await execute([{ sql: queries.GET_LANGUAGES, args: [] }]);

    return <Array<Language>>rows;
  }
}
