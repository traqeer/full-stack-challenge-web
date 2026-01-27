---
applyTo: "app/routes/**"
---

# Páginas en Traqeer Web

## Estructura y organización
- Debemos mantener las páginas legibles, utilizando tantos componentes como sea necesario
- Cada página debe ser completamente independiente de otras páginas
- Cada página debe tener un archivo de contexto
- Utilizamos el hook `useTranslations` para consumir traducciones (desde `~/lib/i18n/hooks.ts`)
- Los componentes específicos de página deben tener nombres descriptivos y específicos del proyecto (ej: TaskCard, RoutineColumn)
- Los componentes de página pueden usar variables de estado del contexto de la página
- El contenido administrativo no necesita ser traducido