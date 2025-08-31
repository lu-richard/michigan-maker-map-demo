import Loading from "../pages/Loading";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../pages/App";
import { useContext } from "react";

function UnauthenticatedRoute() {
    const { profile, loading } = useContext(AppContext);

    if (loading) {
        return <Loading />;
    }

    if (profile) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default UnauthenticatedRoute;