import { Grid } from "@mui/material";
import React from "react";

import Banner from "./Banner";

const url1 = "/GreenHealthyFoodLoseWeight.png";

const url2 = "/GreenHealthyIngredients.png";
const url3 =
  "https://img.freepik.com/free-photo/takeaway-vegan-poke-bowl-photography_53876-124222.jpg?w=1380&t=st=1672050741~exp=1672051341~hmac=b98d019bcc4f832e9ed627f2c3c73a20b43ed06f91f54514c0ff8a2bd1bfa36a";

const MainBanner = () => {
  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Banner
            sxBackground={{
              backgroundImage: `url(${url2})`,
              backgroundColor: "#7fc7d9", // Average color of the background image.
              backgroundPosition: "center",
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={0.5}>
            <Grid item sm={6} xs={12} md={12} lg={12}>
              <Banner
                sxBackground={{
                  backgroundImage: `url(${url3})`,
                  backgroundColor: "#7fc7d9", // Average color of the background image.
                  backgroundPosition: "center",
                }}
                sx={{ height: { xs: `25vh`, md: `${25 - 0.5}vh` } }}
              />
            </Grid>
            <Grid item sm={6} xs={12} md={12} lg={12}>
              <Banner
                sxBackground={{
                  backgroundImage: `url(${url1})`,
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
