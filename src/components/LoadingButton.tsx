import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

export default function LoadingButton({
  isLoading = false,
  children,
  loadingText,
  className = '',
  disabled,
  variant = 'primary',
  ...props
}: LoadingButtonProps) {
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#1A237E] to-yellow-600 text-white hover:shadow-xl',
    secondary: 'bg-white border-2 border-[#1A237E] text-[#1A237E] hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };

  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`
        relative flex items-center justify-center gap-2
        px-6 py-3 rounded-xl font-semibold text-lg
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
        ${variantStyles[variant]}
        ${isLoading ? 'cursor-wait' : ''}
        ${className}
      `}
    >
      {isLoading && (
        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
      )}
      <span>{isLoading && loadingText ? loadingText : children}</span>
    </button>
  );
}
