import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccessToken } from "./authSlice";

const RequireAuth = () => {
    const token = useSelector(selectAccessToken);
    const location = useLocation();

    console.log("RequireAuth", token, location);

    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default RequireAuth;
