---
applyTo: "app/components/ui/*.tsx,app/components/*.tsx"
---

# Componentes UI en Traqeer Web

## Estructura y organización
- Los componentes deben tener traducciones inline si contienen texto: `const translations = createTranslations({en: {}, es: {}})`
- Cada servicio de API debe tener sus tipos en un archivo `types.ts` dentro de su carpeta
- Los componentes deben demostrar su uso exponiendo una instancia Demo y DemoProps: `export { Demo, DemoProps }`
- Solo añadir DemoProps cuando tenga sentido para mostrar la UI, no siempre es necesario
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
      name: 'type',
      type: 'select',
      options: ['one', 'two'],
      required: true,
      description: 'El tipo del componente'
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
    type: 'one',
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
