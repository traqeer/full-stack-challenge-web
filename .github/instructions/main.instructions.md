---
applyTo: '**'
---

# Reglas principales para Traqeer Web

Este proyecto tiene una estructura simple de reglas que son innegociables. Todas las afirmaciones listadas aquí deben verificarse antes de proponer cambios y revisarse nuevamente después.

## Tecnologías y estructura básica

- Trabajamos únicamente con **React Router v7** (modo framework) - siempre verificar documentación
- Utilizamos exclusivamente **shadcn** y **tailwindcss** para estilos
- Instala componentes shadcn con CLI: `npx shadcn-ui@latest add component-name`
- Siempre consulta la documentación oficial de shadcn en ui.shadcn.com

## Estructura del proyecto

- Páginas principales: `/app/routes/[pagename]/route.tsx`
- Subpáginas: `/app/routes/[pagename].[subpage]/route.tsx`
- Componentes específicos por página: `/app/routes/[pagename]/components`
- Componentes UI (en /components/ui) deben tener nombres genéricos y reutilizables
- Al añadir una nueva página, siempre actualiza `app/routes.ts`
- Cada página debe tener su propio archivo de traducciones en `/app/routes/[pagename]/translations.ts`
- Servicios de API deben ubicarse en `app/lib/[apiname]/[service-name]`
- Para fechas relativas, usar `import { formatDateTime } from "~/utils/date.utils"`

## Comportamiento para agentes

- Si no encuentras un archivo, no trates de buscarlo solo. Pregunta donde está.
