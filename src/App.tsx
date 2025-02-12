import { Fragment } from "react";

import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { ThemeProvider } from "@/theme";
import { Provider } from "react-redux";
import { store } from "@/store";

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </Provider>
    </Fragment>
  );
}

export default App;
