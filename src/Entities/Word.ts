type Translations = {[key: string]: string}

export class Word {
  translations: Translations = {};

  addTranslation(language: string, translation: string): void {
    this.translations[language] = translation;
  }

  getTranslations(): Translations {
    return this.translations;
  }

  static fromMap(wordMap: Map<string, string>): Word {
    const word = new Word();

    wordMap.forEach((value, key) => {
      word.addTranslation(key, value);
    });

    return word;
  }
}
