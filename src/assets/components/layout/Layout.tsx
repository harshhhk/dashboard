import Signin from "../pages/Signin";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

import { Outlet } from "react-router-dom";

const Layout = () => {
  const [login, setLogin] = useState<boolean>(true);
  if (login === true) {
    return (
      <>
        <Header></Header>
        <div className="container-fluid">
          <Sidebar></Sidebar>
        </div>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Outlet></Outlet>
        </main>
      </>
    );
  } else {
    return <Signin setLogin={setLogin}></Signin>;
  }
};

export default Layout;
