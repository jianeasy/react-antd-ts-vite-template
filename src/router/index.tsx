import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home";

const routers = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      children: [],
    },
  ],
  {
    // basename: "/basename",
  }
);
export default routers;
