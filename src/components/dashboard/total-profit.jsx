import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const TotalProfit = ({ totalOrders, sx }) => {
  return (
    <Card sx={{ height: "100%" }} {...sx}>
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL ORDERS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {isNaN(totalOrders) ? 0 : totalOrders}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.darker",
                height: 45,
                width: 45,
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 5 }} />
      </CardContent>
    </Card>
  );
};
