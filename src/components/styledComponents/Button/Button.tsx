import React from 'react';
import clsx from 'clsx';
import css from './Button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  start: string;
  form: string;
}

export default function Button({
  children,
  variant,
  type,
  start,
  form,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(css.btn, css[variant], {
        'is-start': start,
        'is-form': form,
      })}
    >
      {children}
    </button>
  );
}
