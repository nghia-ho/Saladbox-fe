import * as React from "react";

import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  List,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCartCustom } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const drawerBleeding = 60;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  position: "relative",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

function SwipeableEdgeDrawer(props) {
  const { window, product } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  let calories = 0;
  let price = 0;
  product.forEach((item) => {
    calories += item.day.calo;
    price += item.day.price;
  });

  const handleAdd = () => {
    dispatch(
      addToCartCustom(
        product.map((e) => {
          return { day: e.day, name: e.name };
        })
      )
    );
    navigate("/cartcustom");
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const map = (
    <Box my={1} sx={{ width: 1 }}>
      {product.map((item, i) => (
        <Stack direction="row" sx={{ p: 1 }} key={i}>
          <Card sx={{ width: { xs: 1 / 6, md: 1 / 18, lg: 1 / 20 } }}>
            <CardActionArea sx={{ display: "flex" }}>
              <CardMedia
                sx={{ width: 1 }}
                component="img"
                image={`http://localhost:8000${item.day?.image}`}
                alt={item.day?.name}
              />
            </CardActionArea>
          </Card>
          <Stack justifyContent="space-between" sx={{ ml: 2, width: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{ fontWeight: 600, color: "success.contrastText" }}
              >
                {item.day?.name}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ color: "success.contrastText" }} align="center">
                {item.day?.price} vnd
              </Typography>
              <Divider orientation="vertical" />
              <Typography sx={{ color: "success.contrastText" }} align="center">
                {item.day?.calo} kcal
              </Typography>
              <Divider orientation="vertical" />
              <Typography
                align="center"
                sx={{ color: "success.contrastText", width: 89 }}
              >
                {item.name}
              </Typography>
            </Stack>
            <Divider />
          </Stack>
        </Stack>
      ))}
    </Box>
  );

  return (
    <Root>
      <CssBaseline />

      <Box sx={{ textAlign: "center", pt: 1, position: "sticky", top: "20px" }}>
        <IconButton onClick={toggleDrawer(true)}>
          <KeyboardDoubleArrowRightIcon />
          <KeyboardDoubleArrowRightIcon />
          <ShoppingCartTwoToneIcon />
        </IconButton>
      </Box>

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            width: 1,
            height: 1,
            bgcolor: "success.main",
            p: 0.5,
          }}
        >
          <Typography
            align="center"
            sx={{ pt: 2, fontWeight: 600, color: "success.contrastText" }}
          >
            Your Items
          </Typography>
          <Stack
            sx={{
              width: 1,
              height: 1,
              bgcolor: "success.main",
              borderRadius: 1,
              p: 0.5,
            }}
          >
            <List
              sx={{
                width: 1,
                position: "relative",
                overflow: "auto",
                maxHeight: { xs: 350, sm: 350, lg: 450, xl: 450 },
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {map}
            </List>

            <Box sx={{ flexGrow: 1 }} />
            <Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ m: 1 }}
              >
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ fontWeight: 600, color: "success.contrastText" }}
                >
                  Total: {price} VND
                </Typography>

                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ fontWeight: 600, color: "success.contrastText" }}
                >
                  {calories} kcal / 7 days
                </Typography>
              </Stack>
              <Button variant="outlined" onClick={handleAdd}>
                Add to cart
              </Button>
            </Stack>
          </Stack>
        </Box>
      </SwipeableDrawer>
    </Root>
  );
}

export default SwipeableEdgeDrawer;
