import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useFormContext, Controller } from "react-hook-form";

const FSelectTitle = ({
  name,
  label,
  defaultValue,
  value,
  children,
  handleChange,
  age,
  ...props
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <option aria-label="None" value={value} />
            {children}
          </Select>
        </>
      )}
    />
  );
};
export default FSelectTitle;
