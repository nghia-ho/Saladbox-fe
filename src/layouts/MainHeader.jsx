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
import { Badge, Grid } from "@mui/material";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Stack } from "@mui/system";
import Banner from "../components/Banner";
import Category from "../components/Category";
import TrendingProduct from "../components/TrendingProduct";
const pages = ["Menu", "Blog", "About", "Contact"];

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

  const url =
    "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  const url2 =
    "https://plus.unsplash.com/premium_photo-1661507186274-da9111b2abb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80";
  const url3 =
    "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
  return (
    <>
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate(`/${page}`)}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                px: 5,
              }}
            >
              {pages.map((page) => (
                <Link to={`/${page.toLowerCase()}`}>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "#085946", display: "block", px: 3 }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            <Stack direction="row" width="10%" justifyContent="space-between">
              <Badge badgeContent={4} color="success">
                <ShoppingBagTwoToneIcon color="action" align="center" />
              </Badge>
              <Badge badgeContent={4} color="success">
                <FavoriteTwoToneIcon color="action" />
              </Badge>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Face5OutlinedIcon />
                    {/* {auth?.user && (
                  <Typography textAlign="center">{` welcome ${auth.user}`}</Typography>
                )} */}
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    {auth.user ? (
                      <Typography
                        textAlign="center"
                        onClick={() => auth.logout()}
                      >
                        logout
                      </Typography>
                    ) : (
                      <Typography
                        textAlign="center"
                        onClick={() => navigate("/login")}
                      >
                        login
                      </Typography>
                    )}
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container sx={{ mt: 5 }} maxWidth="xl">
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={8} md={12} sm={12} xs={12}>
              <Banner
                sxBackground={{
                  backgroundImage: `url(${url})`,
                  backgroundColor: "#7fc7d9", // Average color of the background image.
                  backgroundPosition: "center",
                }}
              />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={6} md={6} lg={12}>
                  <Banner
                    sxBackground={{
                      backgroundImage: `url(${url2})`,
                      backgroundColor: "#7fc7d9", // Average color of the background image.
                      backgroundPosition: "center",
                    }}
                    sx={{ height: "24vh" }}
                  />
                </Grid>
                <Grid item sm={6} xs={6} md={6} lg={12}>
                  <Banner
                    sxBackground={{
                      backgroundImage: `url(${url3})`,
                      backgroundColor: "#7fc7d9", // Average color of the background image.
                      backgroundPosition: "center",
                    }}
                    sx={{ height: "24vh" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Category />
      <TrendingProduct />
    </>
  );
}
export default MainHeader;
