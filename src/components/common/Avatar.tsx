import { cn } from '@/lib/utils';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | null;

interface AvatarProps {
  src?: string;
  size?: AvatarSize;
  name?: string;
  status?: AvatarStatus;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const statusColors: Record<Exclude<AvatarStatus, null>, string> = {
  online: 'bg-emerald-400',
  offline: 'bg-slate-300',
};

function Avatar({ src, size = 'md', name, status, className }: AvatarProps) {
  const initials = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className={cn('relative inline-flex flex-shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={cn(
            'rounded-full object-cover ring-2 ring-white shadow-sm',
            sizeStyles[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-white font-semibold flex items-center justify-center ring-2 ring-white shadow-sm',
            sizeStyles[size]
          )}
        >
          {initials}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}

export default Avatar;
