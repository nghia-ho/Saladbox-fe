import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "../../components/form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const FILTER_GREENS_OPTIONS = ["Kohlrabi Greens", "Bok Choy", "Spinach"];

export const FILTER_VEGGIE_OPTIONS = ["beans ", "lentils ", "okra ", "peanut"];

export const FILTER_PROTEINS_OPTIONS = ["All", "Chicken", "Meat", "Pork"];

export const FILTER_SAUCE_OPTIONS = ["All", "huweg", "iowe", "jiowef"];

export const FILTER_CHEESE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];

function ProductFilter({ resetFilter }) {
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Greens
        </Typography>
        <FMultiCheckbox
          name="greens"
          options={FILTER_GREENS_OPTIONS}
          sx={{ width: 1 }}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Proteins
        </Typography>
        <FRadioGroup
          name="Proteins"
          options={FILTER_PROTEINS_OPTIONS}
          row={false}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Sauce
        </Typography>
        <FRadioGroup name="Sauce" options={FILTER_SAUCE_OPTIONS} row={false} />
      </Stack>

      {/* <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Veggies
        </Typography>
        <FRadioGroup
          name="Veggie"
          options={FILTER_VEGGIE_OPTIONS}
          row={false}
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Cheese
        </Typography>
        <FRadioGroup
          name="Cheese"
          options={FILTER_CHEESE_OPTIONS.map((item) => item.value)}
          getOptionLabel={FILTER_CHEESE_OPTIONS.map((item) => item.label)}
        />
      </Stack> */}

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;
