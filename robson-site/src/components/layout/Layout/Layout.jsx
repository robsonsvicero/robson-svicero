import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";

export default function Layout({ children, mainProps = {} }) {
  return (
    <>
      <Header />
      <main {...mainProps}>{children}</main>
      <Footer />
    </>
  );
}
