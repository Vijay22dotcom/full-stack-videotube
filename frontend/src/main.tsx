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
import { Home, Login, MyProfile, Register } from "./page/index.ts";
import store from "./store/store.ts";
import { AlertProvider } from "./context/Alert.tsx";
import { LoginStatusProvider } from "./context/LoginStatus.tsx";
import ChannelPRofile from "./page/profile/ChannleProfile.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<MyProfile />}>
        <Route path="videos" element={<Register />} />
        <Route path="playlist" element={<Register />} />
        <Route path="tweets" element={<Register />} />
        <Route path="following" element={<Register />} />
      </Route>
      <Route path="/:username" element={<ChannelPRofile />}>
        <Route path="videos" element={<Register />} />
        <Route path="playlist" element={<Register />} />
        <Route path="tweets" element={<Register />} />
        <Route path="following" element={<Register />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AlertProvider>
      <LoginStatusProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </LoginStatusProvider>
    </AlertProvider>
  </React.StrictMode>
);
