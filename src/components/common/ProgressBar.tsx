import { cn } from '@/lib/utils';

type ProgressBarSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number;
  color?: string;
  size?: ProgressBarSize;
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeStyles: Record<ProgressBarSize, { track: string; bar: string }> = {
  sm: { track: 'h-1.5', bar: 'h-1.5' },
  md: { track: 'h-2.5', bar: 'h-2.5' },
  lg: { track: 'h-4', bar: 'h-4' },
};

function ProgressBar({
  value,
  color = '#3B82F6',
  size = 'md',
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-slate-500">进度</span>
          <span className="text-xs font-semibold text-slate-700">{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full bg-slate-100 overflow-hidden',
          sizeStyles[size].track
        )}
      >
        <div
          className={cn(
            'rounded-full bg-gradient-to-r',
            sizeStyles[size].bar,
            animated && 'transition-all duration-500 ease-out'
          )}
          style={{
            width: `${clampedValue}%`,
            backgroundImage: `linear-gradient(to right, ${color}, ${color}cc)`,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
