import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { lazy, Suspense } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./hooks/queryClient";
import { store } from "./store/store";

// Layouts
const BaseLayout = lazy(() => import("./layouts/BaseLayout"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

// Pages
const Home = lazy(() => import("./pages/HomePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));

// Feature Components
const DriverListPage = lazy(() => import("./pages/Driver/Driver"));
const AlloyListPage = lazy(() => import("./pages/Alloy/Alloy"));
const Truck = lazy(() => import("./pages/Truck/Truck"));
const TyrePressure = lazy(() => import("./pages/TyprePressure/TyrePressure"));
const TyresMasterListPage = lazy(() => import("./pages/Tyres/TyresMaster"));
const InsuranceMasterListPage = lazy(() => import("./components/InsuranceComponent/InsuranceMasterListPage"));
const InvoiceMasterListPage = lazy(() => import("./components/InvoiceComponent/InvoiceMasterListPage"));
const ErrorBoundaryPage = lazy(() => import("./components/ErrorBoundary/ErrorBoundaryPage"));

// Loading Component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <BaseLayout />
            </Suspense>
        ),
        errorElement: <ErrorBoundaryPage />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: 'dashboard',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: "product",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <NotFound />
                    </Suspense>
                ),
            },
            {
                path: "order",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <NotFound />
                    </Suspense>
                ),
            },
            {
                path: "billing",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <NotFound />
                    </Suspense>
                ),
            },
            {
                path: "driver",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <DriverListPage />
                    </Suspense>
                ),
            },
            {
                path: 'alloy',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AlloyListPage />
                    </Suspense>
                ),
            },
            {
                path: 'truck',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Truck />
                    </Suspense>
                ),
            },
            {
                path: 'type-pressure',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <TyrePressure />
                    </Suspense>
                ),
            },
            {
                path: "/tyres",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <TyresMasterListPage />
                    </Suspense>
                ),
            },
            {
                path: "/insurance",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <InsuranceMasterListPage />
                    </Suspense>
                ),
            },
            {
                path: "/invoice",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <InvoiceMasterListPage />
                    </Suspense>
                ),
            },
            {
                path: "/complaints",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <NotFound />
                    </Suspense>
                ),
            }
        ],
    },
    {
        path: "/auth",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <AuthLayout />
            </Suspense>
        ),
        children: [
            {
                path: "login",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "signup",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Signup />
                    </Suspense>
                ),
            },
            {
                path: "*",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <ErrorBoundaryPage />
                    </Suspense>
                ),
            }
        ]
    },
    {
        path: "*",
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <ErrorPage />
            </Suspense>
        ),
    },
]);

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </QueryClientProvider>
    );
};

export default App;