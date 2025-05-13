import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useCreateMyUser } from "../api/MyUserApi";
import { useEffect, useRef } from "react";

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    console.log("hasCreatedUser", hasCreatedUser.current);
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <div>Loading...</div>;
};

export default AuthCallbackPage;
