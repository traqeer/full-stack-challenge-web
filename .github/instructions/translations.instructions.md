---
applyTo: "**/translations.ts"
---

# Traducciones en Traqeer Web

## Estructura y formato
- La estructura de traducciones debe ser: `export const translations = createTranslations({en: {}, es: {}})`
- Las traducciones deben ser planas con claves en notación de puntos (ej: `createTranslations({en: {"flat.example": "Translation"} ...})`)
- Los archivos de traducción deben usar el helper `createTranslations` para seguridad de tipos (desde `~/lib/i18n/utils`)
- Las traducciones no se utilizan para características de administración
