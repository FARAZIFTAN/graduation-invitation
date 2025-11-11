import { UserPlus, PackageOpen, AlertCircle, Search } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  type: 'no-invitations' | 'not-found' | 'error' | 'no-results';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export default function EmptyState({
  type,
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  const defaultIcons = {
    'no-invitations': UserPlus,
    'not-found': PackageOpen,
    'error': AlertCircle,
    'no-results': Search,
  };

  const Icon = defaultIcons[type];

  const colorSchemes = {
    'no-invitations': {
      bg: 'from-ffb-gold/20 to-ffb-gold/10',
      icon: 'text-ffb-gold',
      button: 'from-ffb-gold via-ffb-gold-shine to-ffb-gold',
    },
    'not-found': {
      bg: 'from-gray-50 to-gray-100',
      icon: 'text-gray-600',
      button: 'from-gray-600 to-gray-700',
    },
    'error': {
      bg: 'from-red-50 to-red-100',
      icon: 'text-red-600',
      button: 'from-red-600 to-red-700',
    },
    'no-results': {
      bg: 'from-yellow-50 to-yellow-100',
      icon: 'text-yellow-600',
      button: 'from-yellow-600 to-yellow-700',
    },
  };

  const colors = colorSchemes[type];

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center animate-fade-in">
      <div
        className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-6 shadow-lg backdrop-blur-sm border-2 border-ffb-gold/30`}
      >
        {icon || <Icon className={`w-10 h-10 md:w-12 md:h-12 ${colors.icon} drop-shadow-lg`} />}
      </div>

      <h3 className="text-xl md:text-2xl font-extrabold text-white mb-3 drop-shadow-lg">
        {title}
      </h3>

      <p className="text-gray-200 mb-6 max-w-md text-sm md:text-base leading-relaxed font-medium">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className={`px-6 py-3 bg-gradient-to-r ${colors.button} ${type === 'no-invitations' ? 'text-ffb-black' : 'text-white'} rounded-xl font-extrabold hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ffb-gold shadow-gold-lg tracking-wide`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
