export interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <>
      {modal}
      <main className="flex flex-col flex-grow">{children}</main>
    </>
  );
}
