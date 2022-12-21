import React from "react";
import PropTypes from "prop-types";

// @mui
import { Box, Drawer, Typography, Stack, useMediaQuery } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TocIcon from "@mui/icons-material/Toc";
import PropaneIcon from "@mui/icons-material/Propane";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
// components
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const NAV_LIST = [
  {
    name: "Dashboard",
    icon: <ShowChartIcon />,
    to: "/admin",
  },
  {
    name: "Orders",
    icon: <TocIcon />,
    to: "/orders",
  },
  {
    name: "Product",
    icon: <PropaneIcon />,
    to: "/product",
  },
  {
    name: "Ingredient",
    icon: <AirplaneTicketIcon />,
    to: "/ingredient",
  },
];

// ----------------------------------------------------------------------

MainNavAdmin.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function MainNavAdmin({ openNav, onCloseNav }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const mediumViewport = useMediaQuery("(min-width:1200px)");
  const navigate = useNavigate();
  const handleListItemClick = (event, index, to) => {
    navigate(to);
    setSelectedIndex(index);
  };

  const renderContent = (
    <Box>
      <Stack
        sx={{ px: 2.5, py: 3, display: "inline-flex", width: 1 }}
        direction="row"
        alignItems="end"
        justifyContent="center"
      >
        <Logo disableLink={true} />
        <Typography variant="h7" sx={{ fontWeight: 600, ml: 1 }} align="center">
          SaladBox
        </Typography>
      </Stack>

      <Box
        sx={{
          width: 1,
          p: 2,
        }}
      >
        <List component="nav" aria-label="main mailbox folders">
          {NAV_LIST.map((e, i) => (
            <ListItemButton
              key={i}
              selected={selectedIndex === i}
              onClick={(event) => handleListItemClick(event, i, e.to)}
            >
              <ListItemIcon>{e.icon}</ListItemIcon>
              <ListItemText primary={e.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {mediumViewport ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

export default MainNavAdmin;
