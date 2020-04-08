export const GET_WORDS = `
    select mt.value as main_value, st.value as second_value, mt.level
    from words_translations as mt
    join words_translations as st on mt.word_id = st.word_id
    where 
        mt.language = (select value from settings where key = "main_language") and 
        st.language = (select value from settings where key = "secondary_language")
`;

export const GET_LANGUAGES = 'select * from languages';

export const DROP_ALL_TRANSLATIONS = 'delete from words_translations';
export const DROP_ALL_WORDS = 'delete from words';

export const GET_SETTING = 'select value from settings where key = ?';

export const SET_SETTING = 'update settings set value = ? where key = ?';

export const INSERT_WORD = 'insert into words (id) VALUES (null)';

export const INSERT_TRANSLATION = `
    insert into words_translations (value, word_id, language, level)
    values (?, ?, ?, ?)
`;
