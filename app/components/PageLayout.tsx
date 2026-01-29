import React from 'react';
import { Button } from '~/components/ui/button';

const translations = {
  en: {},
  es: {},
};

export function PageLayout({
  title,
  onAction,
  actionLabel,
  children,
}: {
  title: string;
  onAction?: () => void;
  actionLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        {onAction && actionLabel && (
          <Button onClick={onAction}>{actionLabel}</Button>
        )}
      </div>
      <div className="mt-6">
        {children}
      </div>
    </main>
  );
}

const DemoProps = {
  props: [
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'El título de la página'
    },
    {
      name: 'onAction',
      type: 'function',
      required: false,
      description: 'Función para el botón de acción'
    },
    {
      name: 'actionLabel',
      type: 'string',
      required: false,
      description: 'Etiqueta del botón de acción'
    },
    {
      name: 'children',
      type: 'ReactNode',
      required: true,
      description: 'Contenido de la página'
    }
  ],
  defaultValues: {
    title: 'Página de Ejemplo',
    onAction: () => {},
    actionLabel: 'Crear',
    children: <div>Contenido de ejemplo</div>
  }
};

function Demo(props: Partial<PageLayoutProps>) {
  return <PageLayout
    title={props.title || DemoProps.defaultValues.title}
    onAction={props.onAction || DemoProps.defaultValues.onAction}
    actionLabel={props.actionLabel || DemoProps.defaultValues.actionLabel}
  >
    {props.children || DemoProps.defaultValues.children}
  </PageLayout>;
}

type PageLayoutProps = Parameters<typeof PageLayout>[0];

export { Demo, DemoProps };
