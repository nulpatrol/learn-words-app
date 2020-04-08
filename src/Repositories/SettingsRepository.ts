import { execute, processQuery } from '../../Database';
import * as queries from '../SQLQueries';

export class SettingsRepository {
  async get(key: string): Promise<string> {
    const [
      {
        rows: [
          { value },
        ],
      },
    ] = await execute([{ sql: queries.GET_SETTING, args: [key] }]);
    return value;
  }

  async set(key: string, value: string): Promise<boolean> {
    const { rowsAffected } = await processQuery(queries.SET_SETTING, [value, key]);

    return rowsAffected > 0;
  }
}
