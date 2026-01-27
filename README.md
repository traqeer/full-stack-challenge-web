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
