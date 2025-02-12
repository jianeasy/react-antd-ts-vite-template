import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default routers;
