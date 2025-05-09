import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { Hamburger } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex gap-2 items-center text-3xl font-bold tracking-tight text-orange-500"
        >
          <Hamburger className="h-10 w-10" />
          <span>HungerHut.com</span>
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
