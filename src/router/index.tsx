import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home";
import AIPaint from "@/pages/ai-paint";
import ImageMatting from "@/pages/image-matting";
import ImageToVideo from "@/pages/image-to-video";
import TextToModel from "@/pages/text-to-model";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ai-paint",
    element: <AIPaint />,
  },
  {
    path: "/image-matting",
    element: <ImageMatting />,
  },
  {
    path: "/image-to-video",
    element: <ImageToVideo />,
  },
  {
    path: "/text-to-model",
    element: <TextToModel />,
  },
]);

export default routers;
