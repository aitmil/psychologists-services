import React from 'react';
import clsx from 'clsx';
import css from './Section.module.css';

export interface SectionProps {
  children: React.ReactNode;
  variant: string;
}

export default function Section({ children, variant }: SectionProps) {
  return <main className={clsx(css.section, css[variant])}>{children}</main>;
}
