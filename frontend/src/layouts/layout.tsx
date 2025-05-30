import { useAuth0 } from "@auth0/auth0-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

const Layout = ({ children, showHero = false }: Props) => {
  const { user } = useAuth0();
  console.log(user);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
