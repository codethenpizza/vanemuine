export enum Language {
  RU = 'ru',
  EN = 'en',
  EE = 'ee',
}

export type TransLanguage = Exclude<Language, Language.EE>
