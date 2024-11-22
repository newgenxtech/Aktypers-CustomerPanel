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
import DriverListPage from "./pages/Driver/Driver";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./hooks/queryClient";
import AlloyListPage from "./pages/Alloy/Alloy";
import TyrePressure from "./pages/TyprePressure/TyrePressure";
import Truck from "./pages/Truck/Truck";
import TyresMasterListPage from "./pages/Tyres/TyresMaster";

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
            {
                path: "driver",
                element: <DriverListPage />
            },
            {
                path: 'alloy',
                element: <AlloyListPage />
            },
            {
                path: 'truck',
                element: <Truck />,
            },
            {
                path: 'type-pressure',
                element: <TyrePressure />,
            },
            {
                path: "/tyres",
                element: <TyresMasterListPage />
            }
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
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </QueryClientProvider>
        </>
    )
}

export default App