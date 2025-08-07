import { useOutletContext, Outlet, Navigate } from "react-router-dom";
import type { OutletContext } from "../types/types";
import Loading from "../pages/Loading";

function ProtectedRoute() {
    const { session, loading }: OutletContext = useOutletContext();

    if (loading) {
        return <Loading />;
    }

    if (!session) {
        return <Navigate to="/signin" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;