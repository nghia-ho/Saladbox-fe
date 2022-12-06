import { Grid } from "@mui/material";
import IngredientCard from "./IngredientCard";

function IngredientList({ ingredients }) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} mt={1} mb={4}>
      {ingredients?.map((ingredient, index) => (
        <Grid key={ingredient._id} item xs={6} sm={3} md={3} lg={2}>
          <IngredientCard ingredient={ingredient} />
        </Grid>
      ))}
    </Grid>
  );
}

export default IngredientList;
