import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
], {
  basename: "/jingdu", // 设置路由的基础路径
});

export default routers;
