import { Grid } from "@mui/material";
import React from "react";

import Banner from "./Banner";

const url1 =
  "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
const url2 =
  "https://plus.unsplash.com/premium_photo-1661507186274-da9111b2abb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80";
const url3 =
  "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

const MainBanner = () => {
  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Banner
            sxBackground={{
              backgroundImage: `url(${url1})`,
              backgroundColor: "#7fc7d9", // Average color of the background image.
              backgroundPosition: "center",
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={0.5}>
            <Grid item sm={6} xs={6} md={12} lg={12}>
              <Banner
                sxBackground={{
                  backgroundImage: `url(${url2})`,
                  backgroundColor: "#7fc7d9", // Average color of the background image.
                  backgroundPosition: "center",
                }}
                sx={{ height: { xs: `25vh`, md: `${25 - 0.5}vh` } }}
              />
            </Grid>
            <Grid item sm={6} xs={6} md={12} lg={12}>
              <Banner
                sxBackground={{
                  backgroundImage: `url(${url3})`,
                  backgroundColor: "#7fc7d9", // Average color of the background image.
                  backgroundPosition: "center",
                }}
                sx={{ height: "25vh" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MainBanner;
