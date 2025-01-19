/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core";

import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Orders from "./Orders";
import { useNavigate } from "react-router-dom";
import AddProducts from "./AddProducts";
import { Product } from "../context/Products";

import EditAndDeleteProducts from "./EditAndDeleteProducts";

const NAVIGATION = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Manage Products",
  },
  {
    segment: "addProducts",
    title: "Add Products",
    icon: <BarChartIcon />,
  },
  {
    segment: "EditProducts",
    title: "Edit / Delete Products",
    icon: <LayersIcon />,
  },
];
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Dashboard() {
  const navigate = useNavigate();
  const { setRole } = useContext(Product);
  const router = useDemoRouter("/");
  const [session, setSession] = useState({
    user: {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      image: localStorage.getItem("profilePic"),
    },
  });
  useEffect(() => {
    if (!localStorage.getItem("logToken")) {
      navigate("/login");
    }
  }, []);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            image: localStorage.getItem("profilePic"),
          },
        });
      },
      signOut: () => {
        setSession(null);
        localStorage.removeItem("logToken");
        navigate("/login");
      },
    };
  }, []);

  return (
    <div className="">
      <AppProvider
        router={router}
        navigation={NAVIGATION}
        theme={demoTheme}
        session={session}
        authentication={authentication}
        branding={{
          homeUrl: "/",
          title: " Admin panel",
          logo: <img src="logo.png"></img>,
        }}
      >
        <DashboardLayout>
          {router.pathname == "/orders" && <Orders />}
          {router.pathname == "/addProducts" && <AddProducts />}
          {router.pathname == "/EditProducts" && <EditAndDeleteProducts />}
        </DashboardLayout>
      </AppProvider>
    </div>
  );
}

export default Dashboard;
