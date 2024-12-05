import React from 'react';
import css from './ContainerPopUp.module.css';

export interface ContainerPopUpProps {
  children: React.ReactNode;
}

export default function ContainerPopUp({ children }: ContainerPopUpProps) {
  return <div className={css.container}>{children}</div>;
}
