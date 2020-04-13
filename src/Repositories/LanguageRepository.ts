import { execute } from '../../Database';
import * as queries from '../SQLQueries';
import { Language } from '../Types';

export class LanguageRepository {
  static async all(): Promise<Array<Language>> {
    const [{ rows }] = await execute([{ sql: queries.GET_LANGUAGES, args: [] }]);

    return rows as Array<Language>;
  }

  static async active(): Promise<Array<Language>> {
    const [{ rows }] = await execute([{ sql: queries.GET_ACTIVE_LANGUAGES, args: [] }]);

    return rows as Array<Language>;
  }

  static async activate(id: string, isActive: boolean): Promise<boolean> {
    const [{ rowsAffected }] = await execute([{
      sql: queries.SET_ACTIVE_LANGUAGES,
      args: [
        isActive,
        id
      ],
    }]);

    return rowsAffected > 0;
  }
}
