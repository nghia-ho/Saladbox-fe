import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../components/Logo";
import { Badge, Divider, useTheme, Stack } from "@mui/material";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { ColorModeContext } from "../contexts/ThemeProvider";

const pages = ["home", "shop", "custom", "weeklymealplan"];

function MainHeader() {
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
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const auth = useAuth();
  // dark mode
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const menuProfile = auth.user ? (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <AccountCircleTwoToneIcon color="success" />
      </IconButton>
      <Menu
        sx={{ mt: 2 }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography>Hi {auth?.user.user}</Typography>
        </Box>

        <Divider sx={{ bodertyle: "dashed" }} />
        {auth.user.role === "admin" ? (
          <MenuItem to="/admin" component={Link} sx={{ mx: 1 }}>
            Admin
          </MenuItem>
        ) : (
          <Box>
            <MenuItem to="/account" component={Link} sx={{ mx: 1 }}>
              My Profile
            </MenuItem>
            <MenuItem to="/order" component={Link} sx={{ mx: 1 }}>
              My Order
            </MenuItem>
          </Box>
        )}

        <Divider sx={{ bodertyle: "dashed" }} />
        <MenuItem
          sx={{ mx: 1 }}
          onClick={() =>
            auth.logout(() => {
              navigate("/", { replace: true });
            })
          }
        >
          Log out
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <Box
      sx={{ flexGrow: 0, fontSize: "small", color: "primary" }}
      onClick={() => navigate("/login")}
    >
      <IconButton onClick={handleOpenUserMenu} color="primary" sx={{ p: 0 }}>
        <AccountCircleTwoToneIcon color="success" />
      </IconButton>
    </Box>
  );

  const menuPad = (
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
      sx={{
        display: { xs: "block", md: "none" },
      }}
    >
      {pages.map((page, i) => (
        <MenuItem key={i} onClick={handleCloseNavMenu}>
          {page === "weeklymealplan" ? (
            <Typography
              textAlign="center"
              onClick={() => navigate(`/weeklymealplan`)}
            >
              Weekly Meal Plan
            </Typography>
          ) : (
            <Typography
              textAlign="center"
              onClick={() => navigate(`/${page === "home" ? "" : page}`)}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </Typography>
          )}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        boxShadow: "0",
      }}
    >
      <Container maxWidth="lg" sx={{ p: 1 }}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Stack direction="row" alignItems="end">
            <Logo />
            <Typography
              sx={{
                fontWeight: 600,
                ml: 1,
                display: { xs: "none", md: "flex" },
              }}
              variant="body2"
            >
              SaladBox
            </Typography>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                sx={{ py: 0 }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Stack>
          {menuPad}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              px: 5,
            }}
          >
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={
                  (handleCloseNavMenu,
                  () =>
                    navigate(
                      `${
                        page === "home"
                          ? ""
                          : page === "weeklymealplan"
                          ? "/weeklymealplan"
                          : page
                      }`
                    ))
                }
                sx={{
                  my: 2,
                  color: "success.darker",
                  display: "block",
                  px: 3,
                }}
              >
                {page === "weeklymealplan"
                  ? "Weekly Salad"
                  : page.charAt(0).toUpperCase() + page.slice(1)}
              </Button>
            ))}
          </Box>

          <Stack direction="row" justifyContent="space-around" spacing={1}>
            <IconButton
              sx={{ p: 0, pb: 0.5 }}
              onClick={colorMode.toggleColorMode}
              color="success"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon color="success" align="center" />
              ) : (
                <Brightness4Icon color="success" align="center" />
              )}
            </IconButton>

            <Badge
              badgeContent={cart.length}
              color="secondary"
              to="/cart"
              component={Link}
            >
              <ShoppingBagTwoToneIcon color="success" align="center" />
            </Badge>

            {menuProfile}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainHeader;
