import Signin from "../Sign In/Signin";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

import { Outlet } from "react-router-dom";

const Layout = () => {
  const [login, setLogin] = useState<boolean>(true);
  // const [searchTerm, setSearchTerm] = useState("");
  if (login === true) {
    return (
      <>
        <Header
          // searchValue={searchTerm}
          // onSearchChange={(value: string) => setSearchTerm(value)}
        ></Header>
        <div className="container-fluid">
          <Sidebar></Sidebar>
        </div>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Outlet></Outlet>
          {/* <Outlet context={{ searchTerm }}></Outlet> */}
        </main>
      </>
    );
  } else {
    return <Signin setLogin={setLogin}></Signin>;
  }
};

export default Layout;
