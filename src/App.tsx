import { Fragment } from "react";

import "./App.css";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "@/store";
import router from "@/router";
function App() {
  return (
    <Fragment>
      <ReduxProvider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </ReduxProvider>
    </Fragment>
  );
}

export default App;
