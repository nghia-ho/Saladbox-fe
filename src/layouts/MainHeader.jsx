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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../components/Logo";
import { Badge, Divider } from "@mui/material";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Stack } from "@mui/system";

const pages = ["home", "menu", "about", "contact"];

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
  const auth = useAuth();

  const menuProfile = auth.user ? (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Face5OutlinedIcon />
        </IconButton>
      </Tooltip>
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
        <MenuItem to="/account" component={Link} sx={{ mx: 1 }}>
          My Profile
        </MenuItem>
        <MenuItem to="/account" component={Link} sx={{ mx: 1 }}>
          Account setting
        </MenuItem>
        <Divider sx={{ bodertyle: "dashed" }} />
        <MenuItem
          sx={{ mx: 1 }}
          onClick={() =>
            auth.logout(() => {
              navigate(-1);
            })
          }
        >
          Log out
        </MenuItem>
      </Menu>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 0 }} onClick={() => navigate("/login")}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Face5OutlinedIcon />
        </IconButton>
      </Tooltip>
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
          <Typography
            textAlign="center"
            onClick={() => navigate(`/${page === "home" ? "" : page}`)}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static" color="transparent">
        <Container maxWidth="xl" sx={{ p: 1.5 }}>
          {/* {logo} */}
          <Toolbar disableGutters>
            <Logo />

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
            </Box>
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
                    () => navigate(`${page === "home" ? "" : page}`))
                  }
                  sx={{ my: 2, color: "#085946", display: "block", px: 3 }}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Button>
              ))}
            </Box>

            <Stack direction="row" width="10%" justifyContent="space-around">
              <Badge
                badgeContent={auth.cart.length}
                color="success"
                sx={{ display: { xs: "none", md: "inline" } }}
                to="/cart"
                component={Link}
              >
                <ShoppingBagTwoToneIcon color="action" align="center" />
              </Badge>
              <Badge
                badgeContent={4}
                color="success"
                sx={{ display: { xs: "none", md: "inline" } }}
              >
                <FavoriteTwoToneIcon color="action" />
              </Badge>
              {menuProfile}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default MainHeader;
