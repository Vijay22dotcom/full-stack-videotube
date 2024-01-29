import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";


import AlertComponent from "./components/Alert";

function App() {
  return (
    <>
      <Header />
      <AlertComponent/>
      <Outlet/>
    
    </>
  );
}

export default App;
