import Loading from "../pages/Loading";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from '../context/AppContext';
// import { useContext } from "react";

function UnauthenticatedRoute() {
    const { session, loading } = useAppContext();

    if (loading) {
        return <Loading />;
    }

    if (session) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default UnauthenticatedRoute;