import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Toaster } from 'sonner';
import './app.css';
import { LanguageProvider } from './lib/i18n/context';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background">
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}

export { ErrorBoundary } from './components/ErrorBoundary';
