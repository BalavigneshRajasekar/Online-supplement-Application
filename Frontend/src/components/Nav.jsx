/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import { Product } from "../context/Products";
const pages = ["protein", "MassGainer", "Creatine"];
const settings = ["Profile", "MyOrders", "Logout"];
function Nav() {
  const navigate = useNavigate();
  const navRef = useRef();
  const { toggle, setToggle } = useContext(Product);
  const cart = useSelector((state) => state.products.cart);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateToProducts = (name) => {
    navigate(`/product/${name}`);
  };

  const openCart = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };
  useEffect(() => {
    const data = (e) => {
      if (!navRef.current.contains(e.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", data);
    return () => {
      document.removeEventListener("mousedown", data);
    };
  }, [toggle]);

  const handleSettings = (settings) => {
    switch (settings) {
      case "Profile":
        break;
      case "Logout":
        console.log("logout");

        localStorage.removeItem("logToken");
        break;
      case "MyOrders":
        break;
    }
  };

  return (
    <div style={{ position: "relative" }} ref={navRef}>
      <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <img src="/logo.png" style={{ width: "60px" }}></img>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      sx={{ textAlign: "center" }}
                      onClick={() => {
                        navigateToProducts(page);
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <img src="logo.png" style={{ width: "60px" }}></img>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginLeft: 15,
              }}
            >
              {pages.map((page) => (
                <>
                  <Button
                    className="h1"
                    key={page}
                    onClick={() => navigateToProducts(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                </>
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  openCart();
                }}
              >
                <Badge badgeContent={cart.length} color="success">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {localStorage.getItem("logToken") ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          sx={{ textAlign: "center" }}
                          onClick={() => handleSettings(setting)}
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Cart toggle={toggle} setToggle={setToggle}></Cart>
    </div>
  );
}

export default Nav;
