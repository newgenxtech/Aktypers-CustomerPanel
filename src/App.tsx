import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage";
import { store } from "./store/store";


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
                path: "warehouse/:code",
                element: (
                    <div>
                        <h1>Warehouse</h1>
                        <h2>Warehouse Details</h2>
                    </div>
                ),
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
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </>
    )
}

export default App