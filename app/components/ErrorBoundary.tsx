import { isRouteErrorResponse, Links, Meta, Scripts, useRouteError } from 'react-router';
import { useStandaloneTranslations } from '~/lib/i18n/standalone';
import type { Translations } from '~/lib/i18n/types';

const translations: Translations = {
  en: {
    notFoundTitle: '404 - Page not found',
    notFoundHeading: 'Page not found',
    notFoundDescription: "Sorry, the page you're looking for doesn't exist.",
    notFoundButton: 'Back to home',
    errorTitle: 'Error',
    errorHeading: 'Error',
    errorDescription: 'An unexpected error occurred.',
    errorButton: 'Back to home',
    runtimeTitle: 'Error',
    runtimeHeading: 'Oops!',
    runtimeSubheading: 'Something went wrong',
    runtimeDescription: 'An unexpected error occurred.',
    runtimeButton: 'Back to home',
  },
  es: {
    notFoundTitle: '404 - Página no encontrada',
    notFoundHeading: 'Página no encontrada',
    notFoundDescription: 'Lo sentimos, la página que buscas no existe.',
    notFoundButton: 'Volver al inicio',
    errorTitle: 'Error',
    errorHeading: 'Error',
    errorDescription: 'Ha ocurrido un error inesperado.',
    errorButton: 'Volver al inicio',
    runtimeTitle: 'Error',
    runtimeHeading: '¡Oops!',
    runtimeSubheading: 'Algo salió mal',
    runtimeDescription: 'Ha ocurrido un error inesperado.',
    runtimeButton: 'Volver al inicio',
  },
};

export function ErrorBoundary() {
  const error = useRouteError();
  const { t, lang } = useStandaloneTranslations(translations);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <html lang={lang} className="light">
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{t('notFoundTitle')}</title>
            <Meta />
            <Links />
          </head>
          <body className="min-h-screen bg-background">
            <div className="flex min-h-screen flex-col items-center justify-center px-4">
              <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
                <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                  {t('notFoundHeading')}
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  {t('notFoundDescription')}
                </p>
                <a
                  href="/"
                  className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
                >
                  {t('notFoundButton')}
                </a>
              </div>
            </div>
            <Scripts />
          </body>
        </html>
      );
    }

    return (
      <html lang={lang} className="light">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>
            {error.status} - {t('errorTitle')}
          </title>
          <Meta />
          <Links />
        </head>
        <body className="min-h-screen bg-background">
          <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <div className="text-center">
              <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">
                {error.status}
              </h1>
              <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                {error.statusText || t('errorHeading')}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                {error.data?.message || t('errorDescription')}
              </p>
              <a
                href="/"
                className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
              >
                {t('errorButton')}
              </a>
            </div>
          </div>
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html lang={lang} className="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{t('runtimeTitle')}</title>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background">
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-red-600">{t('runtimeHeading')}</h1>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
              {t('runtimeSubheading')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {t('runtimeDescription')}
            </p>
            <a
              href="/"
              className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
            >
              {t('runtimeButton')}
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
