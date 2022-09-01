import { useRoutes, Navigate } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import SimpleMenu from "../layouts/simple-menu/Main";
import TopMenu from "../layouts/top-menu/Main";

import Page1 from "../views/page-1/Main";
import Page2 from "../views/page-2/Main";
import Page3 from "../views/page-3/Main";
import Page4 from "../views/page-4/Main";
import Page5 from "../views/page-5/Main";
import Page6 from "../views/page-6/Main";
import Page7 from "../views/page-7/Main";
import Page8 from "../views/page-8/Main";
import Page9 from "../views/page-9/Main";
import Page10 from "../views/page-10/Main";
import Page11 from "../views/page-11/Main";
import Page12 from "../views/page-12/Main";

import CustomerView from "../views/customer-view/Main";
import DealView from "../views/deal-view/Main";
import ProfileView from "../views/profile-view/Main";
import InvoiceView from "../views/invoice-view/Main";
import QuoteView from "../views/quote-view/Main";
import AccountSettings from "../views/account-settings/Main"
import Login from "../views/login";
import ErrorPage from "../views/error-page";
import { element } from "prop-types";

function Router() {
  const routes = [
    {
      path: "/",
      element: <Navigate to="/side-menu/page-1" replace />
    },
    {
      path: "/login",
      element: <Navigate to="/side-menu/page-1" replace />
    },
    {
      path: "/side-menu",
      element: <SideMenu />,
      children: [
        {
          path: "page-1",
          element: <Page1 />,
        },
        {
          path: "page-2",
          element: <Page2 />,
        },
        {
          path: "page-3",
          element: <Page3 />,
        },
        {
          path: "page-4",
          element: <Page4 />,
        },
        {
          path: "page-5",
          element: <Page5 />,
        },
        {
          path: "page-6",
          element: <Page6 />,
        },
        {
          path: "page-7",
          element: <Page7 />,
        },
        {
          path: "page-8",
          element: <Page8 />,
        },
        {
          path: "page-9",
          element: <Page9 />,
        },
        {
          path: "page-10",
          element: <Page10 />,
        },
        {
          path: "page-11",
          element: <Page11 />,
        },
        {
          path: "page-12",
          element: <Page12 />,
        },
        {
          path: "customer-view",
          element: <CustomerView />,
        },
        {
          path: "deal-view",
          element: <DealView />,
        },
        {
          path: "profile-view",
          element: <ProfileView />,
        },
        {
          path: "invoice-view",
          element: <InvoiceView />,
        },
        {
          path: "quote-view",
          element: <QuoteView />,
        },
        {
          path: "account-settings",
          element: <AccountSettings />,
        },
      ],
    },
    {
      path: "/simple-menu",
      element: <SimpleMenu />,
      children: [
        {
          path: "page-1",
          element: <Page1 />,
        },
        {
          path: "page-2",
          element: <Page2 />,
        },
      ],
    },
    // {
    //   path: "/simple-menu",
    //   element: <SimpleMenu />,
    //   children: [
    //     {
    //       path: "page-1",
    //       element: <Page1 />,
    //     },
    //     {
    //       path: "page-2",
    //       element: <Page2 />,
    //     },
    //   ],
    // },
    // {
    //   path: "/top-menu",
    //   element: <TopMenu />,
    //   children: [
    //     {
    //       path: "page-1",
    //       element: <Page1 />,
    //     },
    //     {
    //       path: "page-2",
    //       element: <Page2 />,
    //     },
    //   ],
    // },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];


  return useRoutes(routes);
}

export default Router;
