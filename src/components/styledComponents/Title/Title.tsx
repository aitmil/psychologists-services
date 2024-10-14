import React from 'react';
import clsx from 'clsx';
import css from './Title.module.css';

export interface TitleProps {
  children: React.ReactNode;
  variant: string;
  popUp: string;
  name: string;
}

export default function Title({ children, variant, popUp, name }: TitleProps) {
  {
    switch (variant) {
      case 'h1':
        return <h1 className={css.h1}>{children}</h1>;
        break;
      case 'h2':
        return (
          <h2
            className={clsx(css.h2, {
              'is-popUp': popUp,
              'is-name': name,
            })}
          >
            {children}
          </h2>
        );
        break;
      case 'h3':
        return <h3 className={css.h3}>{children}</h3>;
        break;
    }
  }
}
