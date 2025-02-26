'use client';

import React from 'react';
import clsx from 'clsx';

export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  variant: 'filled' | 'outlined';
  type: 'submit' | 'reset' | 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  start?: boolean;
  form?: boolean;
}

export default function Button({
  className,
  children,
  variant,
  type,
  start = false,
  form = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        `${className} font-medium text-[16px] leading-[125%] tracking-[-0.01em] rounded-[30px] transition duration-200 px-[40px] py-[14px] active:scale-95 active:opacity-80`,
        {
          // Variant styles
          'bg-orange-light text-white border-transparent hover:bg-orange-dark active:bg-orange-dark':
            variant === 'filled',
          'bg-transparent border border-border-color text-foreground hover:border-orange-dark active:border-orange-dark':
            variant === 'outlined',

          // Conditional styles
          'text-[20px] leading-[120%] px-[50px] py-[18px]': start,
          'px-[16px] py-[16px]': form,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
