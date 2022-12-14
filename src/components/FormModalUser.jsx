import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  // FormControl,
  // FormHelperText,
  // InputLabel,
  // MenuItem,
  // Select,
  Stack,
  Box,
  MenuItem,
  Menu,
} from "@mui/material";
import { FTextField, FormProvider, FSelect, FMultiCheckbox } from "./form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function FormModalUser({ handleClose, open, mode }) {
  const [errors, setErrors] = useState({});

  const defaultValues = {
    name: "",
    decription: "",
    ingredients: "",
    category: "",
    image: "",
    price: "",
    calo: "",
    type: "",
  };

  const methods = useForm({
    // resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    // reset,
    setError,
    // formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ width: { md: 400, lg: 600 } }}>
        <DialogTitle>
          {mode === "create" ? "CREATE A NEW PRODUCT" : "EDIT PRODUCT"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={1} mt={1}>
                <FTextField name="name" label="Your Name" />
                <FTextField name="decription" label="Decription" />
                <Stack direction={"row"} alignItems="center">
                  <FSelect name="category" label="Category" select>
                    {[
                      "MANUAL",
                      "AUTOMATIC",
                      "AUTOMATED_MANUAL",
                      "DIRECT_DRIVE",
                      "UNKNOWN",
                    ].map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </FSelect>

                  <Button>Create new category</Button>
                </Stack>
                <FMultiCheckbox name="ingredients" options={["Python", "JS"]} />
                <FTextField name="image" label="Image" />
                <FTextField name="price" label="Price" />
                <FTextField name="calo" label="Calorie" />
                <FSelect name="type" label="Type" select>
                  {["custom", "avaiable"].map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </FSelect>
              </Stack>
              {/* <FormControl
              error={errors.transmission_type}
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel id="transmission_type_label">
                Transmission Type
              </InputLabel>
              <Select
                labelId="transmission_type_label"
                name="transmission_type"
                value={form.transmission_type}
                onChange={handleChange}
                label="Transmission Type"
              >
                {[
                  "MANUAL",
                  "AUTOMATIC",
                  "AUTOMATED_MANUAL",
                  "DIRECT_DRIVE",
                  "UNKNOWN",
                ].map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {errors.transmission_type ? (
                <FormHelperText>{errors.transmission_type}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl
              error={errors.size}
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel id="size-label">Size</InputLabel>
              <Select
                labelId="size-label"
                name="size"
                value={form.size}
                onChange={handleChange}
                label="Size"
              >
                {["Compact", "Midsize", "Large"].map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {errors.size ? (
                <FormHelperText>{errors.size}</FormHelperText>
              ) : null}
            </FormControl> */}
              {/* <TextField
              error={errors.style}
              helperText={errors.style ? errors.style : null}
              value={form.style}
              margin="dense"
              name="style"
              label="Style"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            /> */}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} type="submit">
                  {mode === "create" ? "Create" : "Save"}
                </Button>
              </DialogActions>
            </FormProvider>
            <Stack direction="row" spacing={2}>
              {/* <DatePicker
              views={["year"]}
              label="Year"
              value={moment(form.release_date.toString()).format("YYYY")}
              error={errors.release_date}
              onChange={(newValue) => {
                setForm({ ...form, release_date: moment(newValue).year() });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={errors.release_date ? errors.release_date : null}
                />
              )}
            /> */}

              {/* <TextField
                value={form.price}
                onChange={handleChange}
                error={errors.price}
                helperText={errors.price ? errors.price : null}
                margin="dense"
                name="price"
                label="Price"
                type="number"
                variant="standard"
              /> */}
            </Stack>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default FormModalUser;
