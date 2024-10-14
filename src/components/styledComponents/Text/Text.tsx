import React from 'react';
import clsx from 'clsx';
import css from './Text.module.css';

export interface TextProps {
  children: React.ReactNode;
  variant: string;
}

export default function Text({ children, variant }: TextProps) {
  return <p className={clsx(css.text, css[variant])}>{children}</p>;
}
