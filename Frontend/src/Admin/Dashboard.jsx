/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useNavigate } from "react-router-dom";
import { Product } from "../context/Products";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";

import "./Dashboard.css";

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

    }else{
      navigate('/dashboard')
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
    <div>
      <ReactRouterAppProvider
        navigation={NAVIGATION}
        theme={demoTheme}
        session={session}
        authentication={authentication}
        branding={{
          homeUrl: "dashboard",

          title: "Admin panel",
          logo: <img src="/logo.png"></img>,
        }}
      >
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </ReactRouterAppProvider>
    </div>
  );
}

export default Dashboard;
