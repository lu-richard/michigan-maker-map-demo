import App from "../pages/App";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Map from "../pages/Map";
import EquipmentCatalog from "../pages/EquipmentCatalog";
import EquipmentDetail from "../pages/EquipmentDetail";
import MakerspaceCatalog from "../pages/MakerspaceCatalog";
import MakerspaceDetail from "../pages/MakerspaceDetail";
import Dashboard from "../pages/Dashboard";
import AskMaizey from "../pages/AskMaizey";
import Blog from "../pages/Blog";
import ProtectedRoute from "../components/ProtectedRoute";
import UnauthenticatedRoute from "../components/UnauthenticatedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import AdminDashboardHome from "../pages/AdminDashboardHome";
import AdminDashboardUsageStats from "../pages/AdminDashboardUsageStats";
import AdminDashboardTraining from "../pages/AdminDashboardTraining";
import AdminProfileDetail from "../pages/AdminProfileDetail";

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                element: <UnauthenticatedRoute />,
                children: [
                    { path: 'signup', element: <SignUp /> },
                    { path: 'signin', element: <SignIn /> },
                ]
            },
            {
                element: <ProtectedRoute />,
                children: [
                    { index: true, element: <Home /> },
                    { path: 'map', element: <Map /> },
                    { path: 'makerspaces', element: <MakerspaceCatalog /> },
                    { path: 'makerspace-detail/:id', element: <MakerspaceDetail /> },
                    { path: 'equipment', element: <EquipmentCatalog /> },
                    { path: 'equipment-detail/:id', element: <EquipmentDetail /> },
                    { path: 'dashboard', element: <Dashboard /> },
                    {
                        path: 'admindashboard',
                        element: <AdminDashboard />,
                        children: [
                            { index: true, element: <AdminDashboardHome /> },
                            { path: 'training', element: <AdminDashboardTraining /> },
                            { path: 'usage', element: <AdminDashboardUsageStats /> },
                        ]
                    },
                    { path: 'admin-profile-detail/:id', element: <AdminProfileDetail /> },
                    { path: 'askmaizey', element: <AskMaizey /> },
                    { path: 'blog', element: <Blog /> },
                ]
            },
        ]
    },
];

export default routes;