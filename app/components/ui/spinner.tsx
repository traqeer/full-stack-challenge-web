export type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
};

export function Spinner({ size = 'md' }: SpinnerProps) {
  const dims = size === 'sm' ? 1.5 : size === 'lg' ? 2.5 : 2;
  return (
    <svg
      className="animate-spin text-blue-600"
      style={{ width: `${dims}rem`, height: `${dims}rem` }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Spinner;
