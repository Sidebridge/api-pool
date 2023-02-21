import Footer from "../common/layout/Footer";
import Header from "../common/layout/Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <main className="">{children}</main>
      <section
        id="footer"
        className="w-full p-20 py-6 border-t border-grey-light bg-dark-matte"
      >
        <Footer />
      </section>
    </div>
  );
}

export default MainLayout;
