import { processQuery, execute } from '../Database';
import { WordRepository } from '../src/Repositories/WordRepository';
import { Word } from '../src/Models/Word';

const tables = [
  `create table if not exists languages (
    id integer primary key not null,
    key varchar,
    name varchar,
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

const migrateLanguages = async () => {
  const languagesList = [
    { key: 'en', name: 'English' },
    { key: 'de', name: 'Deutsch' },
    { key: 'pl', name: 'Polski' },
    { key: 'uk', name: 'Українська' },
    { key: 'da', name: 'Dansk' },
    { key: 'ru', name: 'Русский' },
    { key: 'fr', name: 'Français' },
  ];
  const languagesPromises = languagesList.map((lang) => {
    processQuery('insert into languages (key, name) VALUES (?, ?)', [lang.key, lang.name]);
  });
  await Promise.all(languagesPromises);
};

export default async (): Promise<void> => {
  let isMigrated = false;
  try {
    const [{ rows }] = await execute([
      { sql: 'select value from settings where key = "migrated"', args: [] },
    ]);
    isMigrated = rows.length > 0;
  } catch (e) {
  }

  if (isMigrated) {
    return;
  }

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

  const wordRepository = new WordRepository();
  await wordRepository.store(
    Word.fromMap(
      new Map([
        ['en', 'hello'],
        ['de', 'hallo'],
        ['pl', 'cześć'],
        ['uk', 'привіт'],
        ['da', 'hej'],
      ]),
    ),
  );
  await wordRepository.store(
    Word.fromMap(
      new Map([
        ['en', 'ever'],
        ['de', 'je'],
        ['pl', 'kiedykolwiek'],
        ['uk', 'коли-небудь'],
        ['da', 'nogensinde'],
      ]),
    ),
  );

  await wordRepository.store(
    Word.fromMap(
      new Map([
        ['en', 'to bump'],
        ['de', 'stoßen'],
        ['pl', 'pchnięcie'],
        ['uk', 'наштовхуватися'],
        ['da', 'skub'],
        ['ru', 'hi'],
      ]),
    ),
  );

  await wordRepository.store(
    Word.fromMap(
      new Map([
        ['en', 'I like'],
        ['de', 'Je suis étudiant.'],
        ['pl', 'pchnięcie'],
        ['uk', 'наштовхуватися'],
        ['da', 'skub'],
        ['ru', 'привет'],
      ]),
    ),
  );

  await processQuery('insert into settings (key, value) VALUES ("migrated", "ok")');
};
