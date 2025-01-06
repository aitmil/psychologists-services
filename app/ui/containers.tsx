import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="max-w-[1440px] mx-auto px-32">{children}</div>;
}
