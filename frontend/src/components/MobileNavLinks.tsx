import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-orange-500 px-3 py-2 rounded"
      >
        Manage Restaurant
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500 px-3 py-2 rounded"
      >
        User Profile
      </Link>

      <Button
        className="flex items-center px-3 font-bold hover:bg-gray-500 text-white bg-orange-500"
        onClick={() => logout()}
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
