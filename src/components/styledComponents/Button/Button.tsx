import React from 'react';
import clsx from 'clsx';
import css from './Button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  start?: string;
  form?: string;
}

export default function Button({
  children,
  variant,
  type,
  start,
  form,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(css.btn, css[variant], {
        [css.start]: start,
        [css.form]: form,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
