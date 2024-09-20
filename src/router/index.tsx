import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/login";
import Home from "@/pages/home";
import User from "@/pages/home/User";
import Course from "@/pages/home/Course";
import Dashbord from "@/pages/home/Dashbord";
import ClassManage from "@/pages/home/Class";
import Setting from "@/pages/home/Setting";
import Project from "@/pages/home/Project";
const routers = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/dashboard",
          element: <Dashbord />,
        },
        {
          path: "/user",
          element: <User />,
        },
        {
          path: "/setting",
          element: <Setting />,
        },
        {
          path: "/class",
          element: <ClassManage></ClassManage>,
        },
        {
          path: "/course",
          element: <Course />,
        },
        {
          path: "/project",
          element: <Project />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],
  {
    basename: "/dianxinxuexi",
  }
);
export default routers;
