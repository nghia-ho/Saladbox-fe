import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const BannerRoot = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  position: "relative",
  display: "flex",
  alignItems: "end",
  justifyContent: "center",
  minWidth: "100%",
  height: "50vh",
}));

const Background = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -2,
});

function Banner({ sxBackground, children, sx }) {
  return (
    <BannerRoot sx={{ ...sx }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "common.black",
            opacity: 0.3,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
      </Container>
    </BannerRoot>
  );
}

Banner.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Banner;
