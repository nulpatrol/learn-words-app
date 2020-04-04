import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('application.db');

export class Database {
  static getConnection() {
    return db;
  }
}

export const processQuery = (sql: string, params = []) => new Promise(
  (resolve: Function, reject: Function) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (a, b) => reject(b),
      );
    });
  }
);

export const execute = (statements: any) => new Promise(
  (resolve, reject) => {
    db.exec(statements, false, (error, result) => {
      if (!error) {
        return resolve(result);
      }

      reject(error);
    })
  }
);
