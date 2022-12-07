import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { Paper, Stack } from "@mui/material";

import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../hooks/useAuth";

const ShippingSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  district: Yup.string().required("District is required"),
  city: Yup.string().required("City is required"),
  phone: Yup.number().positive().required("Phone is required"),
});

const ShippingAddress = () => {
  const navigate = useNavigate();
  const { saveShippingAddress, shippingAdress } = useAuth();

  const defaultValues = {
    address: shippingAdress.address || "",
    district: shippingAdress.district || "",
    city: shippingAdress.city || "",
    phone: shippingAdress.phone || "",
  };

  const methods = useForm({
    resolver: yupResolver(ShippingSchema),
    defaultValues,
  });
  const { handleSubmit, reset, setError } = methods;

  const onSubmit = async (data) => {
    const { address, district, city, phone } = data;
    try {
      saveShippingAddress({ address, district, city, phone }, () =>
        navigate("/payment")
      );
    } catch (error) {
      reset();
      setError("responseError", error);
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10, p: 5 }}>
      <Paper sx={{ p: 5 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          SHIPPING ADDRESS
        </Typography>
        <Box sx={{ mt: 1 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <FTextField
                name="address"
                label="Address"
                style={{ marginBottom: "0.4rem" }}
              />

              <FTextField
                name="district"
                label="District"
                style={{ marginBottom: "0.4rem" }}
              />
              <FTextField
                name="city"
                label="City"
                style={{ marginBottom: "0.4rem" }}
              />
              <FTextField
                name="phone"
                label="Phone"
                style={{ marginBottom: "0.4rem" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                CONTINUE
              </Button>
            </Stack>
          </FormProvider>
        </Box>
      </Paper>
    </Container>
  );
};
export default ShippingAddress;
