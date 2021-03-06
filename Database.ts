import * as SQLite from 'expo-sqlite';
import { WebSQLDatabase } from 'expo-sqlite';

const db = SQLite.openDatabase('application.db');

export class Database {
  static getConnection(): WebSQLDatabase {
    return db;
  }
}

export const processQuery = async<T> (
  sql: string,
  params: Array<T> = [],
): Promise<SQLite.SQLResultSet> => new Promise(
  (resolve: Function, reject: Function) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (a, b) => reject(b),
      );
    });
  },
);

export const execute = async (
  statements: Array<SQLite.Query>,
): Promise<Array<SQLite.ResultSet>> => new Promise((resolve: Function, reject: Function): void => {
  db.exec(statements, false, (error, result) => {
    if (!error) {
      return resolve(result);
    }

    return reject(error);
  });
});
