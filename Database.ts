import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('application.db');

export class Database  {
    static getConnection() {
        return db;
    }
}

export const processQuery = async<T> (sql: string, params: Array<T> = []): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve: Function, reject: Function) => {
        db.transaction(tx => {
            tx.executeSql(
                sql,
                params,
                (_, result) => resolve(result),
                (a, b) => reject(b)
            )
        });
    });
};

export const execute = async (statements: Array<SQLite.Query>): Promise<Array<SQLite.ResultSet>> => {
    return new Promise((resolve: Function, reject: Function) => {
        db.exec(statements, false, (error, result) => {
            if (!error) {
                return resolve(result)
            }

            reject(error)
        });
    });
};
