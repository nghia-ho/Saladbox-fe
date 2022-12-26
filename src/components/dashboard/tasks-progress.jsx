import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";

export const TasksProgress = ({ progress, sx, value }) => {
  return (
    <Card sx={{ height: "100%" }} {...sx}>
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Tasks Progress
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {isNaN(progress) ? 0 : progress}%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "secondary.darker",
                height: 45,
                width: 45,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress value={Number(value)} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};
