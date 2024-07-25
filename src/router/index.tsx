import { useRoutes, createBrowserRouter } from "react-router-dom";
import Login from "@/pages/login";
import Home from "@/pages/home";
const routers = createBrowserRouter(
  [
    { path: "/", element: <Home />, children: [] },
    {
      path: "/login",
      element: <Login />,
    },
  ],
  {
    basename: "/",
  }
);
export default routers;
