import type { Language, Translations } from './types';
import { detectLanguage } from './utils';

/**
 * Standalone translation hook for use outside React context boundaries
 *
 * **When to use this hook:**
 * - In Error Boundaries (where React Context is not available after errors)
 * - In components that render before LanguageProvider mounts
 * - In isolated components that don't have access to LanguageContext
 * - For server-side rendering scenarios where context is unavailable
 *
 * **When NOT to use this hook:**
 * - In regular components that are children of LanguageProvider
 * - When you need reactive language switching (use `useTranslations` instead)
 *
 * **Key differences from `useTranslations`:**
 * - Does NOT use LanguageContext - detects language directly on each render
 * - Does NOT react to context changes - only detects on mount/render
 * - Works independently of React context tree
 * - Suitable for error boundaries and edge cases
 *
 * @param translations - Translation object with keys for each language
 * @returns Object with `t` function for translations and `lang` for current language
 *
 * @example
 * ```tsx
 * const translations = {
 *   en: { greeting: 'Hello', farewell: 'Goodbye' },
 *   es: { greeting: 'Hola', farewell: 'Adiós' }
 * } as const;
 *
 * function ErrorBoundary() {
 *   const { t, lang } = useStandaloneTranslations(translations);
 *   return <div>{t('greeting')}</div>;
 * }
 * ```
 */
export function useStandaloneTranslations<T extends Translations>(translations: T) {
  const lang: Language = (() => {
    try {
      return detectLanguage();
    } catch {
      return 'es';
    }
  })();

  const t = (key: keyof T[Language]) => {
    const translation = translations[lang][key as string];
    return typeof translation === 'string' ? translation : String(translation);
  };

  return { t, lang };
}
