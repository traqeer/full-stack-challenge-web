export type Language = 'en' | 'es';

export type TranslationRecord = {
  [key: string]: string | string[];
};

export type Translations = {
  [key in Language]: TranslationRecord;
};

export type TranslationKey<T extends Translations> = keyof T[Language];
