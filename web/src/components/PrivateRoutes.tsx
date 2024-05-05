import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingCircle from "./LoadingCircle";
import { useEffect } from "react";
import Header from "./header";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [isLoading, user, navigate]);

  return (
    <>
      {(isLoading || !user) && <LoadingCircle height="100vh" />}
      {!isLoading && user && (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
};

export default PrivateRoutes;
