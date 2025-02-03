export interface SectionProps {
  children: React.ReactNode;
  variant?: 'home';
}

export default function Section({ children, variant }: SectionProps) {
  let variantClass = 'pt-[64px] pb-[100px]';

  if (variant === 'home') {
    variantClass = 'pt-[78px] pb-[100px]';
  }

  return <main className={`${variantClass}`}>{children}</main>;
}
