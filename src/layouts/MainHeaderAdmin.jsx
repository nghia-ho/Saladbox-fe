import * as React from "react";
import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import { useTheme } from "@mui/material";

import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

import MenuIcon from "@mui/icons-material/Menu";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../contexts/ThemeProvider";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backgroundColor: "inherit",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,

  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

MainHeaderAdmin.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function MainHeaderAdmin({ onOpenNav }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const auth = useAuth();
  const navigate = useNavigate();

  //dark mode
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={0}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, color: "text.primary" }}
              >
                <AccountCircleTwoToneIcon />
              </IconButton>

              <IconButton
                onClick={colorMode.toggleColorMode}
                color="text.primary"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon align="center" />
                ) : (
                  <Brightness4Icon align="center" />
                )}
              </IconButton>
            </Stack>
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
              <MenuItem
                sx={{ mx: 1 }}
                onClick={() =>
                  auth.logout(() => {
                    navigate("/login", { replace: true });
                  })
                }
              >
                Log out
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
