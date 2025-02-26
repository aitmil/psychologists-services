export interface SectionProps {
  children: React.ReactNode;
  variant?: 'home';
}

export default function Section({ children, variant }: SectionProps) {
  let variantClass = 'pt-8 md:pt-10 pt-[64px] pb-12 md:pb-16 pb-[100px]';

  if (variant === 'home') {
    variantClass = 'pt-10 md:pt-14 xl:pt-[78px] pb-12 md:pb-16 xl:pb-[100px]';
  }

  return <main className={`${variantClass}`}>{children}</main>;
}
