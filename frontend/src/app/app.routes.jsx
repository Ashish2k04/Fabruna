import {createBrowserRouter} from "react-router";
import Register from "../features/auth/pages/Register";

export const routes = createBrowserRouter([
    {
        element: <h1>Welcome to the App</h1>,
        path: "/"
    },
      {
        element: <Register />,
        path: "/register"
    }
])