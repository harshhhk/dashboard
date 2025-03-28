import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./assets/components/pages/Dashboard";
import Orders from "./assets/components/pages/Orders";
import Products from "./assets/components/pages/Products";
import Integrations from "./assets/components/pages/Integrations";
import Customers from "./assets/components/pages/Customers";
import Layout from "./assets/components/layout/Layout";
import Reports from "./assets/components/pages/Reports";
import Accounts from "./assets/components/pages/Accounts";
import Categories from "./assets/components/pages/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
      },
      {
        path: "/categories",
        element: <Categories></Categories>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/accounts",
        element: <Accounts></Accounts>,
      },
      {
        path: "/integrations",
        element: <Integrations></Integrations>,
      },
      {
        path: "/customers",
        element: <Customers></Customers>,
      },
      {
        path: "/reports",
        element: <Reports></Reports>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
