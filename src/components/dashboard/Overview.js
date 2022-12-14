// @mui
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

export default function OverView({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,

        textAlign: "center",
        color: (theme) => theme.palette[color].contrastText,
        bgcolor: (theme) => theme.palette[color].light,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="subtitle2" sx={{ opacity: 0.72, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {total}
      </Typography>
    </Card>
  );
}
