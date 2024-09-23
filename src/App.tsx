import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import { store } from "./store/store";
import NotFound from "./pages/NotFound";
import WarehouseListPage from "./pages/WareHouse/WarehouseListPage";
import WarehouseDetailPage from "./pages/WareHouse/WarehouseDetailPage";
import Dashboard from "./pages/Dashboard";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <BaseLayout />
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: "warehouse",
                element: (
                    <WarehouseListPage />
                ),
            },
            {
                path: "warehouse/:code",
                element: <WarehouseDetailPage />
            },
            {
                path: "product",
                element: <NotFound />,
            },
            {
                path: "order",
                element: <NotFound />,
            },
            {
                path: "billing",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,

    },
]);
const App = () => {
    return (
        <>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </>
    )
}

export default App