import { useRoutes, Navigate } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import SimpleMenu from "../layouts/simple-menu/Main";
import TopMenu from "../layouts/top-menu/Main";
import Page1 from "../views/page-1/Main";
import Page2 from "../views/page-2/Main";
import Login from "../views/login";
import ErrorPage from "../views/error-page";
import { element } from "prop-types";

function ProtectedRouter() {
  const routes = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      redirect: "/",
      element: <Navigate to="/login" replace />,
    },
  ];

  return useRoutes(routes);
}

export default ProtectedRouter;
