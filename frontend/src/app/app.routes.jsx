import {createBrowserRouter} from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Protected from "../features/auth/components/Protected";

export const routes = createBrowserRouter([
    {
        element: <Protected><h1>Welcome to the App</h1></Protected>,
        path: "/"
    },
    {
        element: <Register />,
        path: "/register"
    },
    {
        element: <Login />,
        path: "/login"
    }
]);