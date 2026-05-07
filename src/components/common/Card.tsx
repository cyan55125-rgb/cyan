import { type ReactNode, type CSSProperties, type MouseEventHandler } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardPadding = 'sm' | 'md' | 'lg';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: CardPadding;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const paddingStyles: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

function Card({ children, className, hover = false, padding = 'md', style, onClick }: CardProps) {
  const Wrapper = hover ? motion.div : 'div';
  const motionProps = hover
    ? {
        whileHover: { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' },
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }
    : {};

  return (
    <Wrapper
      className={cn(
        'rounded-2xl bg-white shadow-sm border border-slate-100/80',
        paddingStyles[padding],
        onClick && 'cursor-pointer',
        className
      )}
      style={style}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Wrapper>
  );
}

export default Card;
