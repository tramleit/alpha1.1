import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/side-menu/page-1",
        title: "Dashboard",
      },
      {
        icon: "Users",
        pathname: "/side-menu/page-2",
        title: "Customers",
      },
      {
        icon: "Package",
        pathname: "/side-menu/page-3",
        title: "Deals",
      },
      // {
      //   icon: "BarChart2",
      //   pathname: "/side-menu/page-4",
      //   title: "Campaigns",
      // },
      // {
      //   icon: "UserPlus",
      //   pathname: "/side-menu/page-5",
      //   title: "Leads",
      // },
      {
        icon: "FileText",
        pathname: "/side-menu/page-6",
        title: "Invoices",
      },
      {
        icon: "FilePlus",
        pathname: "/side-menu/page-7",
        title: "Quotes",
      },
      {
        icon: "Tag",
        pathname: "/side-menu/page-8",
        title: "Products",
      },
      {
        icon: "Clipboard",
        pathname: "/side-menu/page-9",
        title: "Tasks",
      },
      {
        icon: "Calendar",
        pathname: "/side-menu/page-10",
        title: "Meetings",
      },
      {
        icon: "PhoneCall",
        pathname: "/side-menu/page-11",
        title: "Calls",
      },
      {
        icon: "User",
        pathname: "/side-menu/page-12",
        title: "Users",
      },
    ],
  },
});

export { sideMenu };
