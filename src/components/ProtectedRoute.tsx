import { Outlet, Navigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { AppContext } from "../pages/App";
import { useContext } from "react";

function ProtectedRoute() {
    const { session, loading } = useContext(AppContext);

    if (context.loading) {
        return <Loading />;
    }

    if (!context.session) {
        return <Navigate to="/signin" />;
    }

    // Pass the context down! Context only flows down one layer, so we need to pass it explicitly.
    return <Outlet context={context} />;
}

export default ProtectedRoute;