export interface TitleProps {
  children: React.ReactNode;
  variant: 'h1' | 'h2' | 'h3';
  popUp?: boolean;
  name?: boolean;
}

export default function Title({ children, variant, popUp, name }: TitleProps) {
  switch (variant) {
    case 'h1':
      return (
        <h1 className="font-semibold text-[80px] leading-[102%] tracking-[-0.02em] mb-[20px] max-w-[595px]">
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2
          className={`font-medium ${
            popUp ? 'text-[40px] leading-[120%] tracking-[-0.02em]' : ''
          } ${name ? 'text-[24px] leading-[100%]' : ''}`}
        >
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="font-medium text-[16px] leading-[150%] text-light-color">
          {children}
        </h3>
      );
    default:
      return null;
  }
}
