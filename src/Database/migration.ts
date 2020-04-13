import { processQuery, execute } from '../../Database';
import { SettingsRepository } from '../Repositories/SettingsRepository';

const tables = [
  `create table if not exists languages (
    id integer primary key not null,
    key varchar,
    name varchar,
    active boolean,
    UNIQUE(key)
  );`,
  `create table if not exists words (
    id integer primary key not null
  );`,
  `create table if not exists words_translations (
    id integer primary key not null,
    value varchar,
    word_id integer,
    language varchar,
    level int,
    FOREIGN KEY(language) REFERENCES languages(key),
    FOREIGN KEY(word_id) REFERENCES words(id)
  );`,
  `create table if not exists settings (
    key varchar primary key not null,
    value varchar not null
  );`,
];

const migrateLanguages = async (): void => {
  const languagesList = [
    { key: 'en', name: 'English', active: true },
    { key: 'de', name: 'Deutsch', active: true },
    { key: 'pl', name: 'Polski', active: false },
    { key: 'uk', name: 'Українська', active: false },
    { key: 'da', name: 'Dansk', active: false },
    { key: 'ru', name: 'Русский', active: false },
    { key: 'fr', name: 'Français', active: false },
  ];
  const languagesPromises = languagesList.map(lang => processQuery(
    'insert into languages (key, name, active) VALUES (?, ?, ?)',
    [
      lang.key,
      lang.name,
      lang.active,
    ],
  ));
  await Promise.all(languagesPromises);
};

const migrate = async (): Promise<void> => {
  await execute([
    { sql: 'PRAGMA foreign_keys = ON;', args: [] },
    { sql: 'drop table if exists words_translations', args: [] },
    { sql: 'drop table if exists words', args: [] },
    { sql: 'drop table if exists settings', args: [] },
    { sql: 'drop table if exists languages', args: [] },
  ]);

  const promises = tables.map(statement => processQuery(statement));
  await Promise.all(promises);

  await processQuery('insert into settings (key, value) VALUES ("main_language", "en")');
  await processQuery('insert into settings (key, value) VALUES ("secondary_language", "ru")');

  await migrateLanguages();

  await processQuery('insert into settings (key, value) VALUES ("migrated", "ok")');
};

export default async (): Promise<void> => {
  try {
    await SettingsRepository.get('migrated');
    return;
  } catch (e) {
    await migrate();
  }
};
