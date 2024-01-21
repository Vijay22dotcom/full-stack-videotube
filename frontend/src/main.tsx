import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Home, Login, Register } from "./page/index.ts";
import store from "./store/store.ts";
import { AlertProvider } from "./context/Alert.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login  />} />
      <Route path="/register" element={<Register/>} />
    </Route>
  ) 
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AlertProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </AlertProvider>
  </React.StrictMode>
);
