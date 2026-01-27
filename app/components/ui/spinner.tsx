import { Loader2Icon } from 'lucide-react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

function Spinner({ size = 'md' }: SpinnerProps) {
  const sizeClass = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-10 w-10' : 'h-6 w-6';
  return <Loader2Icon className={`animate-spin ${sizeClass}`} />;
}

const DemoProps = {
  props: [
    {
      name: 'size',
      type: 'select',
      required: false,
      description: 'The size of the spinner',
      options: ['sm', 'md', 'lg'],
    },
  ],
  defaultValues: {
    size: 'md',
  },
};

function Demo(props: Partial<SpinnerProps>) {
  return <Spinner size={props?.size || 'md'} />;
}

export { Demo, DemoProps, Spinner };
