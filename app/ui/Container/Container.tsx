import React from 'react';
import css from './Container.module.css';

export interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className={css.container}>{children}</div>;
}
