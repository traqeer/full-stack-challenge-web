# Todo App (Challenge base)

Minimal TODO app scaffold used for technical challenges. Features:

- Typed mock backend (`app/lib/backend`)
- Todos context (`app/lib/todos`) with CRUD methods
- Time API wrapper (`app/lib/timeapi`) with typed response and fallback
- Pages for list, create/edit and detail under `app/routes/todos`
- Simple per-page translations under `app/routes/todos/translations.ts`
- Copilot rules: `.github/copilot_rules.md`

How to run

1. Install dependencies (if not installed):

```powershell
npm install
```

2. Start dev server:

```powershell
npm run dev
```

Notes

- The mock backend is in-memory and resets on reload.
- The `getCurrentTime` wrapper fetches from worldtimeapi.org and falls back to a local value on error.

# Traqeer Challenge (esqueleto)

Este directorio `challenge` contiene un esqueleto mínimo para un proyecto Vite + React + React Router que imita la configuración del repo principal.

Instrucciones rápidas (Windows PowerShell):

```powershell
cd challenge;
npm install;
npm run dev
```

Notas:

- `vite.config.ts` incluye los plugins `@react-router/dev` y `@tailwindcss/vite`, como en el repo principal.
- Si quieres Tailwind funcionando, instala las dependencias listadas en `package.json` (tailwindcss, postcss, autoprefixer).
- Esto sólo crea el proyecto; ejecutar `npm install` instalará las dependencias reales.

Estructura creada dentro de `challenge/` (uso de `app/` en lugar de `src/`):

- `challenge/root.tsx` — entry que monta la app (usa `app/root.tsx`).
- `challenge/app/root.tsx` — componente raíz que define la navegación y usa `app/routes/*`.
- `challenge/app/routes/index.tsx` — página Home.
- `challenge/app/routes/about.tsx` — página About.
- `challenge/app/app.css` — estilos con directivas de Tailwind.

Nota: eliminé `index.html` y la carpeta `src/` para seguir tu preferencia. Si quieres que el proyecto funcione exactamente igual al repo principal en modo framework, podremos adaptar estos archivos (por ejemplo agregar entradas específicas que use `@react-router/dev`) — dime si querés que lo deje listo para ejecutar también.
