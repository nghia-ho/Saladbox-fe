import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { Paper, Stack } from "@mui/material";

import { FormProvider, FRadioGroup } from "../components/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { savePaymentMethod } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const PaymentPage = () => {
  const [payment] = useState(["COD", "Paypal"]);

  const defaultValues = {
    payment: "",
  };

  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit, reset, setError } = methods;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { payment } = data;
    try {
      if (!payment) {
        return;
      }
      dispatch(savePaymentMethod(payment, () => navigate("/placeorder")));
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
          Select Payment Method
        </Typography>
        <Box sx={{ mt: 1 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <FRadioGroup
                options={payment}
                name={"payment"}
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
export default PaymentPage;
