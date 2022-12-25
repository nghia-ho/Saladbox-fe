import { useFormContext, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import UploadAvatar from "../UploadAvartar";

function FUploadAvatar({ name, product, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div>
            <UploadAvatar
              error={checkError}
              {...other}
              file={field.value}
              product={product}
            />
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

export default FUploadAvatar;
