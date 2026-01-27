---
applyTo: 'app/components/*.tsx,app/routes/**/components/*.tsx'
---

# Componentes en Traqeer Web

## Estructura y organización

- Los archivos de componentes deben seguir la convención PascalCase (ej: `Onboarding.tsx`, `UserProfile.tsx`)
- Los componentes deben incluir traducciones inline si contienen texto: `const translations = createTranslations({en: {}, es: {}})`
- Los "componentes inteligentes" (`app/components/*.tsx`) deben ser 100% independientes, con máximo uno o dos ID como props
- Los "componentes de página" (`app/routes/**/components/*.tsx`) sirven para mejorar la legibilidad y pueden ser más complejos y acoplados a la página
- Los componentes deben exportar una instancia Demo y DemoProps para documentación y pruebas (Excepto los componentes de página)

## Rendering

- Elementos comunes (header, modals) van **fuera** del renderizado condicional. Usar `{condition ? <A/> : <B/>}` para el contenido variable.

## Ejemplo de implementación Demo

```typescript
const DemoProps = {
  props: [
    {
      name: 'routineId',
      type: 'string',
      required: true,
      description: 'El ID de la rutina para gestionar términos'
    },
    {
      name: 'onTermsChange',
      type: 'function',
      required: false,
      description: 'Callback opcional cuando los términos son actualizados'
    }
  ],
  defaultValues: {
    routineId: '6c61b78a-7d2c-46b2-af0f-1b9601152064',
    onTermsChange: (terms: string[]) => {}
  }
};

function Demo(props: Partial<TermsManagerProps>) {
  return <TermsManager
    routineId={props.routineId || DemoProps.defaultValues.routineId}
    onTermsChange={props.onTermsChange}
  />;
}
export { TermsManager, Demo, DemoProps }
```
