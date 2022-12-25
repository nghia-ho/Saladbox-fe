// import { formatDistanceToNow, subHours } from "date-fns";
import moment from "moment";

import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";
import { isString } from "lodash";

export const LatestProducts = ({ products }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Latest Products"
      />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem divider={i < products.length - 1} key={i}>
            <ListItemAvatar>
              <img
                alt={product.name}
                style={{
                  height: 48,
                  width: 48,
                }}
                src={
                  isString(product.image) &&
                  product.image.includes("cloudinary")
                    ? product.image
                    : `http://localhost:8000${product.image}`
                }
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Updated ${moment(product.updatedAt).calendar()}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={() => navigate("/product", { state: 2 })}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};
