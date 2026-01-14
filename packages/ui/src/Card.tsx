import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, subtitle, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-slate-700 rounded-lg p-6 shadow-lg ${className}`}
        {...props}
      >
        {title && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-slate-100">{title}</h2>
            {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
