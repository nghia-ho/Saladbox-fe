import { Button, Container, Grid, Typography } from "@mui/material";
import Juice from "./Juice";
import Salad from "./Salad";
import Smoothies from "./Smoothies";
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Banner from "../Banner";
import EastIcon from "@mui/icons-material/East";
import { Stack } from "@mui/system";
const NewArrival = () => {
  const [value, setValue] = React.useState("Salad");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const list = [
    {
      id: 1,
      title: "Salad",
      url: "https://en.pimg.jp/070/025/034/1/70025034.jpg",
      component: <Salad />,
    },
    {
      id: 2,
      title: "Smoothies",
      url: "https://img.freepik.com/premium-vector/smoothie-drink-illustration-hand-drawn_86707-29.jpg?w=2000",
      component: <Smoothies />,
    },
    {
      id: 3,
      title: "Juice",
      url: "https://img.freepik.com/premium-vector/orange-juice-illustration_7297-24.jpg?w=2000",
      component: <Juice />,
    },
  ];
  return (
    <Container sx={{ mt: 5 }} maxWidth="xl">
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5">New Arrival</Typography>
        <Tabs
          value={value}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => handleChange(e, value)}
        >
          {list.map((tab) => (
            <Tab
              disableRipple
              key={tab.id}
              value={tab.title}
              label={tab.title}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        {list.map((e) => {
          const isMatch = e.title === value;

          return (
            isMatch && (
              <Grid container spacing={2} key={e.id}>
                <Grid
                  item
                  lg={3}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    },
                  }}
                >
                  <Banner
                    sxBackground={{
                      backgroundImage: `url(${e.url})`,
                      backgroundColor: "#7fc7d9", // Average color of the background image.
                      backgroundPosition: "center",
                    }}
                  />
                </Grid>
                <Grid item lg={9} md={12}>
                  {e.component}
                  <Stack
                    sx={{
                      mt: 5,
                      display: {
                        xs: "none",
                        sm: "none",
                        md: "flex",
                        lg: "flex",
                      },
                    }}
                    direction="row"
                    justifyContent="end"
                  >
                    <Button size="small">See more</Button>
                  </Stack>
                </Grid>
              </Grid>
            )
          );
        })}
      </Box>
    </Container>
  );
};

export default NewArrival;
