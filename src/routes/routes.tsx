import App from "../pages/App";
import SignIn from "../pages/SignIn";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Map from "../pages/Map";
import EquipmentCatalog from "../pages/EquipmentCatalog";
import MakerspaceCatalog from "../pages/MakerspaceCatalog";
import MakerspaceDetail from "../pages/MakerspaceDetail";
import Dashboard from "../pages/Dashboard";
import AskMaizey from "../pages/AskMaizey";
import Blog from "../pages/Blog";

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            { path: 'map', element: <Map /> },
            { path: 'makerspaces', element: <MakerspaceCatalog /> },
            { path: 'makerspace-detail/:id', element: <MakerspaceDetail /> },
            { path: 'equipment', element: <EquipmentCatalog /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'askmaizey', element: <AskMaizey /> },
            { path: 'blog', element: <Blog /> },
        ]
    },
    {
        path: '/signin',
        element: <SignIn />,
        errorElement: <Error />,
    },
];

export default routes;