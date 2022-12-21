import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const TotalProfit = ({ totalOrders, sx }) => (
  <Card sx={{ height: "100%" }} {...sx}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            TOTAL ORDERS
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {totalOrders}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "success.darker",
              height: 56,
              width: 56,
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
