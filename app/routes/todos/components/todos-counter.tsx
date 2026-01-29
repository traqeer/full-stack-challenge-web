import { SidebarFooter } from '~/components/ui/sidebar';
import { useTranslations } from '~/lib/i18n/hooks';
import { useTodos } from '../context';

const counterTranslations = {
  en: {
    total: 'Total:',
    completed_label: 'Completed:',
  },
  es: {
    total: 'Total:',
    completed_label: 'Completado:',
  },
};

export function TodosCounter() {
  const { counts } = useTodos();
  const t = useTranslations(counterTranslations);

  return (
    <SidebarFooter>
      <div className="p-4 text-sm text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>{t('total')}</span>
          <span className="font-medium">{counts.all}</span>
        </div>
        {counts.all > 0 && (
          <div className="mt-2">
            <div className="flex justify-between text-xs">
              <span>{t('completed_label')}</span>
              <span>{Math.round((counts.completed / counts.all) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 mt-1">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(counts.completed / counts.all) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </SidebarFooter>
  );
}