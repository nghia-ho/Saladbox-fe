import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return value;
}

function ProductFilter({ setPrice, price, value, setValue }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleViewPrice = (value) => {
    let price;
    for (let index = 0; index < value.length; index++) {
      price = `${value[index - 1]?.toLocaleString()} - ${value[
        index
      ]?.toLocaleString()}`;
    }
    return price;
  };

  const handlePrice = () => {
    setPrice(value);
  };

  return (
    <Stack spacing={3} sx={{ mt: 3, width: 1 }}>
      <Paper elevation={2} sx={{ p: 1, height: 1 }}>
        <Typography align="center" sx={{ py: 1.5, fontWeight: 600 }}>
          Pricing Filter
        </Typography>
        <Divider variant="middle" />

        <Stack sx={{ width: 1, p: 1 }} spacing={{ xs: 1, md: 0 }}>
          <Slider
            sx={{ mt: { xs: 1, md: 0 } }}
            getAriaLabel={() => "Temperature range"}
            value={[...value]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            color="success"
            size="small"
            min={0}
            max={150000}
          />
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color: "success.darker" }}
          >
            Price:{" "}
            <Typography variant="caption" noWrap>
              {handleViewPrice(value)}
            </Typography>
          </Typography>

          <Button
            variant="outlined"
            color="success"
            onClick={handlePrice}
            sx={{
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
              width: 1,
            }}
          >
            Filter
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default ProductFilter;
