import { Outlet, Navigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { AppContext } from "../pages/App";
import { useContext } from "react";

function ProtectedRoute() {
    const { profile, loading } = useContext(AppContext);

    if (loading) {
        return <Loading />;
    }

    if (!profile) {
        return <Navigate to="/signin" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;