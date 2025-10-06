import { Outlet, Navigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { useAppContext } from '../context/AppContext';
// import { useContext } from "react";

function ProtectedRoute() {
    const { profile, loading } = useAppContext();

    if (loading) {
        return <Loading />;
    }

    if (!profile) {
        return <Navigate to="/signin" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;