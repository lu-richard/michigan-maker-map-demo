import Loading from "../pages/Loading";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../pages/App";
import { useContext } from "react";

function UnauthenticatedRoute() {
    const { session, loading } = useContext(AppContext);

    if (loading) {
        return <Loading />;
    }

    if (session) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default UnauthenticatedRoute;