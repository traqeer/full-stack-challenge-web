import { isRouteErrorResponse, useRouteError } from 'react-router';
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
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="mt-4 text-2xl font-bold">{t('notFoundHeading')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('notFoundDescription')}</p>
            <a
              href="/"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
            >
              {t('notFoundButton')}
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold">{error.status}</h1>
          <h2 className="mt-4 text-2xl font-bold">{error.statusText || t('errorHeading')}</h2>
          <p className="mt-4 text-lg text-gray-600">
            {error.data?.message || t('errorDescription')}
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
          >
            {t('errorButton')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">{t('runtimeHeading')}</h1>
        <h2 className="mt-3 text-xl font-medium">{t('runtimeSubheading')}</h2>
        <p className="mt-3 text-lg text-gray-600">{t('runtimeDescription')}</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
        >
          {t('runtimeButton')}
        </a>
      </div>
    </div>
  );
}
