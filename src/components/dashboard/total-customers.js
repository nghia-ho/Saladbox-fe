import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";

export const TotalCustomers = ({ totalcustomers, ...sx }) => (
  <Card {...sx}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography gutterBottom variant="overline">
            TOTAL CUSTOMERS
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {totalcustomers}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "primary.darker",
              height: 56,
              width: 56,
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 5 }} />
    </CardContent>
  </Card>
);
