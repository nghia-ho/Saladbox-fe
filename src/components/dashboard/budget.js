import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Tooltip,
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
          <Tooltip title={totalSales.toLocaleString()}>
            <Typography variant="h4">
              {totalSales.toLocaleString().slice(0, 6)}k
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "error.light",
              height: 45,
              width: 45,
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
