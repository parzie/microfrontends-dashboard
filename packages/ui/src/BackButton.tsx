import React from 'react';
import { Button, type ButtonProps } from './Button';

export interface BackButtonProps extends Omit<ButtonProps, 'children'> {
  label?: string;
}

export const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ label = '← Back', onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      window.history.back();
      onClick?.(e);
    };

    return (
      <Button
        ref={ref}
        variant="secondary"
        size="sm"
        onClick={handleClick}
        {...props}
      >
        {label}
      </Button>
    );
  }
);

BackButton.displayName = 'BackButton';
