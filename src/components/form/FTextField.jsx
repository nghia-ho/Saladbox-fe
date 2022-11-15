import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      //A component is changing an uncontrolled input to be controlled.
      //This is likely caused by the value changing from undefined to a defined value, which should not happen.
      //Decide between using a controlled or uncontrolled input element for the lifetime of the component.
      defaultValue={""}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

export default FTextField;
