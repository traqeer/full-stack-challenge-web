'use client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Spinner } from '~/components/ui/spinner';
import { useTranslations } from '~/lib/i18n/hooks';
import type { Translations } from '~/lib/i18n/types';

const translations: Translations = {
  en: {
    redirecting: 'Redirecting to home...',
  },
  es: {
    redirecting: 'Redirigiendo a inicio...',
  },
};

export default function IndexRoute() {
  const navigate = useNavigate();
  const t = useTranslations(translations);

  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
      <span className="ml-4 text-lg">{t('redirecting')}</span>
    </div>
  );
}
