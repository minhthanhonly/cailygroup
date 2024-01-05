import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = (allowedRoles: string) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
      auth?.roles?.find((role: string) => allowedRoles?.includes(role))
          ? <Outlet />
          : auth?.user
              ? <Navigate to="/users" state={{ from: location }} replace />
              : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
