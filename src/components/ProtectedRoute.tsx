import { useOutletContext, Outlet, Navigate } from "react-router-dom";
import type { OutletContext } from "../types/types";
import Loading from "../pages/Loading";

function ProtectedRoute() {
    const context = useOutletContext<OutletContext>();

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