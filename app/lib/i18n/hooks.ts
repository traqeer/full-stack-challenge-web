import { useCallback } from 'react';
import { useLanguage } from './context';
import type { TranslationKey, Translations } from './types';

export function useTranslations<T extends Translations>(translations: T) {
  const { language } = useLanguage();

  return useCallback(
    (key: TranslationKey<T>) => {
      const translation = translations[language][key as string];
      return typeof translation === 'string' ? translation : String(translation);
    },
    [language, translations]
  );
}
