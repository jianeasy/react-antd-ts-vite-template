import { Fragment } from "react";

import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { ThemeProvider } from "@/theme";

function App() {
  return (
    <Fragment>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
