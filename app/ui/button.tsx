'use client';

import React from 'react';
import clsx from 'clsx';

export interface ButtonProps {
  children: React.ReactNode;
  variant: 'filled' | 'outlined';
  type: 'submit' | 'reset' | 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  start?: boolean;
  form?: boolean;
}

export default function Button({
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
        'font-medium text-[16px] leading-[125%] tracking-[-0.01em] rounded-[30px] transition duration-200 px-[40px] py-[14px]',
        {
          // Variant styles
          'bg-orange-light text-white border-transparent hover:bg-orange-dark':
            variant === 'filled',
          'bg-transparent border border-border-color text-foreground hover:border-orange-dark':
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
