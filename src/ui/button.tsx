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
  form,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        `${className} font-medium text-[16px] leading-[125%] tracking-[-0.01em] rounded-[22px] sm:rounded-[26px] lg:rounded-[30px] transition duration-200 active:scale-95 active:opacity-80`,
        {
          'bg-orange-light text-white border-transparent hover:bg-orange-dark active:bg-orange-dark':
            variant === 'filled',
          'px-[32px] sm:px-[36px] lg:px-[40px] py-[10px] sm:py-[12px] lg:py-[14px] bg-transparent border border-border-color text-foreground hover:border-orange-dark active:border-orange-dark':
            variant === 'outlined',
          'text-[20px] leading-[120%] px-[42px] sm:px-[46px] lg:px-[50px] py-[14px] sm:py-[16px] lg:py-[18px]':
            start,
          'p-[16px]': form,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
