import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
  Divider,
  MenuItem,
  Popover,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

import { useState } from "react";

// ----------------------------------------------------------------------

const StyledSearchbar = styled("div")(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up("md")]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    label: "Profile",
    icon: <PersonIcon />,
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
  },
];

const StyledRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backgroundColor: "#f8f8f8",
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
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        {/* Search Bar */}
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            {!open && (
              <IconButton onClick={handleOpen}>
                <SearchIcon />
              </IconButton>
            )}

            <Slide direction="down" in={open} mountOnEnter unmountOnExit>
              <StyledSearchbar>
                <Input
                  autoFocus
                  fullWidth
                  disableUnderline
                  placeholder="Search…"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{ color: "text.disabled", width: 20, height: 20 }}
                      />
                    </InputAdornment>
                  }
                  sx={{ mr: 1, fontWeight: "fontWeightBold" }}
                />
                <Button variant="contained" onClick={handleClose}>
                  Search
                </Button>
              </StyledSearchbar>
            </Slide>
          </div>
        </ClickAwayListener>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <IconButton
            onClick={handleOpen}
            sx={{
              p: 0,
              ...(open && {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                },
              }),
            }}
          >
            <PersonIcon />
          </IconButton>

          <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                p: 0,
                mt: 1.5,
                ml: 0.75,
                width: 180,
                "& .MuiMenuItem-root": {
                  typography: "body2",
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <Divider sx={{ borderStyle: "dashed" }} />

            <Stack sx={{ p: 1 }}>
              {MENU_OPTIONS.map((option) => (
                <MenuItem key={option.label} onClick={handleClose}>
                  {option.label}
                </MenuItem>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: "dashed" }} />

            <MenuItem onClick={handleClose} sx={{ m: 1 }}>
              Logout
            </MenuItem>
          </Popover>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
