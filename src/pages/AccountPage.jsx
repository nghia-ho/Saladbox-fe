import { Container, Paper, Typography, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React, { useState } from "react";

import ProfileInfomation from "../features/user/ProfileInfomation";
import OrderList from "../features/order/OrderList";
import BMI from "../features/user/BMI";
import ChangePassword from "../features/user/ChangePassword";
import FavoriteList from "../features/product/FavoriteList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ m: 1, p: 1 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const AccountPage = () => {
  const [value, setValue] = useState(0);
  const mediumViewport = useMediaQuery("(min-width:900px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: { xs: "block", sm: "block", md: "flex" },
          }}
        >
          <Tabs
            orientation={mediumViewport ? "vertical" : "horizontal"}
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="ProfileInfomation" {...a11yProps(0)} />
            <Tab label="OrderList" {...a11yProps(1)} />
            <Tab label="BMI Calculate" {...a11yProps(2)} />
            <Tab label="ChangePassword" {...a11yProps(3)} />
            <Tab label="FavoriteList" {...a11yProps(4)} />
            <Tab label="Log Out" {...a11yProps(5)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <ProfileInfomation />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderList />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BMI />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ChangePassword />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <FavoriteList />
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
};

export default AccountPage;
