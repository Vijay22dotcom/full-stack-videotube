import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

import Home from "./page/Home";
import Sidemenu from "./components/Sidemenu";

function App() {
  return (
    <>
      <Header />
      <Outlet/>
    
    </>
  );
}

export default App;
