export interface LayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout({ children, header, modal }: LayoutProps) {
  return (
    <>
      {modal}
      {header}
      <main>{children}</main>
    </>
  );
}
