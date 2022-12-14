import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

function FAutocomplete({
  name,
  options,
  getOptionLabel,
  width,
  defaultValue,
  isOptionEqualToValue,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          multiple
          disableCloseOnSelect
          limitTags={2}
          id="multiple-limit-tags"
          options={options}
          isOptionEqualToValue={isOptionEqualToValue}
          defaultValue={defaultValue}
          getOptionLabel={getOptionLabel}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ingredient List"
              placeholder="Choose Ingredient"
              fullWidth
              error={!!error}
              helperText={error?.message}
              {...other}
            />
          )}
          onChange={(event, values) => onChange(values)}
          sx={{ width: width }}
        />
      )}
    />
  );
}

export default FAutocomplete;