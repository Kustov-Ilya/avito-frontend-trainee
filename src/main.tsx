import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import MainPage from "./pages/main-page/main-page";
import GamePage from "./pages/game-page/game-page";
import "./styles/index.pcss";
import { store } from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: ":game",
        element: <GamePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <React.Suspense fallback="Loading..."> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* </React.Suspense> */}
  </React.StrictMode>
);
