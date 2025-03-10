export interface TextProps {
  children: React.ReactNode;
  variant: 'light' | 'bold' | 'homeText';
  className?: string;
}

export default function Text({ children, variant, className }: TextProps) {
  let variantClass = '';

  switch (variant) {
    case 'light':
      variantClass = 'text-secondary-color';
      break;
    case 'bold':
      variantClass = 'font-medium leading-[150%]';
      break;
    case 'homeText':
      variantClass =
        'font-medium text-center lg:text-left text-base xl:text-lg leading-[133%] mb-[24px] sm:mb-[32px] xl:mb-[40px] max-w-[510px]';
      break;
    default:
      break;
  }

  return <p className={`${variantClass} ${className}`}>{children}</p>;
}
