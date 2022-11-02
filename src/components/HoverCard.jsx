import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Banner from "./Banner";

const HoverCard = () => {
  const [open, setOpen] = useState({
    avaiable: false,
    optional: false,
  });
  const url1 =
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  const url2 =
    "https://images.unsplash.com/photo-1606757819934-d61a9f7279d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
  return (
    <Container sx={{ mt: 5, minWidth: "80%" }}>
      <Typography variant="h5" sx={{ my: 5 }}>
        Our Services
      </Typography>
      <Container sx={{ mt: 5, minWidth: "50%" }}>
        <Grid container spacing={6}>
          <Grid item xs={6} lg={6} sm={6}>
            {!open.avaiable ? (
              <Box
                onClick={() => setOpen((prev) => ({ ...prev, avaiable: true }))}
              >
                <Banner
                  sxBackground={{
                    backgroundImage: `url(${url2})`,
                    backgroundColor: "#7fc7d9",
                    backgroundPosition: "center",
                  }}
                >
                  <Button sx={{ mt: 60 }} variant="contained" color="secondary">
                    see more
                  </Button>
                </Banner>
              </Box>
            ) : (
              <Box
                onClick={() =>
                  setOpen((prev) => ({ ...prev, avaiable: false }))
                }
              >
                <Banner
                  sxBackground={{
                    backgroundImage: `url(${url1})`,
                    backgroundColor: "#7fc7d9",
                    backgroundPosition: "center",
                  }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={6} lg={6} sm={6}>
            {!open.optional ? (
              <Box
                onClick={() => setOpen((prev) => ({ ...prev, optional: true }))}
              >
                <Banner
                  sxBackground={{
                    backgroundImage: `url(${url1})`,
                    backgroundColor: "#7fc7d9",
                    backgroundPosition: "center",
                  }}
                >
                  <Button sx={{ mt: 60 }} variant="contained" color="secondary">
                    see more
                  </Button>
                </Banner>
              </Box>
            ) : (
              <Box
                onClick={() =>
                  setOpen((prev) => ({ ...prev, optional: false }))
                }
              >
                <Banner
                  sxBackground={{
                    backgroundImage: `url(${url2})`,
                    backgroundColor: "#7fc7d9",
                    backgroundPosition: "center",
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default HoverCard;
