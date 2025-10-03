import { Outlet, Navigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { useAppContext } from '../context/AppContext';
// import { useContext } from "react";

function ProtectedRoute() {
    const { session, loading } = useAppContext();

    if (loading) {
        return <Loading />;
    }

    if (!session) {
        return <Navigate to="/signin" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;