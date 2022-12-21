import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import MoneyIcon from "@mui/icons-material/Money";

export const Budget = ({ totalSales, ...sx }) => (
  <Card>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            TOTAL SALES
          </Typography>
          <Typography variant="h4">{totalSales.toLocaleString()}</Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "error.light",
              height: 56,
              width: 56,
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 5 }} />
    </CardContent>
  </Card>
);
