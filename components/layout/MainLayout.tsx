import Header from "../common/layout/Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <main className="">{children}</main>
    </div>
  );
}

export default MainLayout;
