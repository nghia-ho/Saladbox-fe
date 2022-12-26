import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

function FAutocomplete({
  name,
  options,
  getOptionLabel,
  width,
  defaultValue,
  isOptionEqualToValue,
  label,
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
          limitTags={1}
          id="multiple-limit-tags"
          options={options}
          isOptionEqualToValue={isOptionEqualToValue}
          defaultValue={defaultValue}
          getOptionLabel={getOptionLabel}
          renderOption={(props, option) => (
            <li {...props} key={option._id}>
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              key={(options) => options.id}
              placeholder="Add Ingredient"
              fullWidth
              error={!!error}
              helperText={error?.message}
              {...other}
            />
          )}
          onChange={(event, values) => onChange(values)}
          sx={{ width: width, my: 0.5 }}
        />
      )}
    />
  );
}

export default FAutocomplete;
