import Footer from "../common/layout/Footer";
import Header from "../common/layout/Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <main
        style={{
          minHeight: "calc(100vh - 12rem)",
        }}
      >
        {children}
      </main>
      <section
        id="footer"
        className="w-full px-10 py-6 border-t border-opacity-75 lg:px-20 border-grey-light bg-body"
      >
        <Footer />
      </section>
    </div>
  );
}

export default MainLayout;
