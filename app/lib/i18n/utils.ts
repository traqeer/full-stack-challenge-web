import type { Language, Translations } from './types';

// Shared language detection utility that can be used by context and other utilities
export function detectLanguage(): Language {
  // Check URL parameter first (highest priority)
  try {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang');
      if (langParam === 'en' || langParam === 'es') {
        return langParam;
      }
    }
  } catch (error) {
    // Ignore errors
  }

  // Check browser language
  try {
    if (typeof navigator !== 'undefined') {
      if (navigator.languages && navigator.languages.length > 0) {
        for (const lang of navigator.languages) {
          if (lang.startsWith('es')) return 'es';
          if (lang.startsWith('en')) return 'en';
        }
      }

      if (navigator.language) {
        const lang = navigator.language.toLowerCase();
        if (lang.startsWith('es')) return 'es';
        if (lang.startsWith('en')) return 'en';
      }
    }
  } catch (error) {
    // Ignore errors
  }

  // Default fallback
  return 'es';
}

// Helper to create type-safe translations
export function createTranslations<T extends Translations>(translations: T): T {
  return translations;
}
