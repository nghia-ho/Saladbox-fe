import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";

function InfoCommitShop() {
  const pictures = [
    { pic: "/safe.png", title: "Safe" },
    { pic: "/fast-delivery.png", title: "Fast Deliver" },
    { pic: "/nutrition.png", title: "Nutrition" },
  ];
  return (
    <Card>
      <Box sx={{ bgcolor: "secondary.light", p: 1 }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            align="center"
            sx={{
              fontWeight: "600",
              m: 2,
              px: 2,
              display: "block",
              textTransform: "uppercase",
              borderRadius: 0.5,
              bgcolor: "primary.light",
            }}
          >
            Our Commit
          </Typography>
        </Box>

        <Grid
          container
          spacing={1}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {pictures.map((picture, index) => (
            <Grid key={index} item xs={5} md={5} lg={5}>
              <Box>
                <Box
                  sx={{
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    p: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={picture.pic}
                    alt={picture.title}
                    sx={{ width: 1 / 3 }}
                  />
                </Box>
                <Typography
                  align="center"
                  variant="body1"
                  sx={{
                    fontWeight: "600",
                    my: 1,
                    display: "block",
                    borderRadius: 1,
                  }}
                >
                  {picture.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default InfoCommitShop;
