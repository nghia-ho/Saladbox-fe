import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Container } from "@mui/system";
import { Alert, IconButton, InputAdornment, Stack } from "@mui/material";

import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./userSlice";
import { LoadingButton } from "@mui/lab";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
});

const defaultValues = {
  password: "",
  passwordConfirmation: "",
};

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { isLoading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const { user } = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const { password, passwordConfirmation } = data;
      dispatch(
        updateUser({
          userId: user._id,
          newPassword: password,
          passwordConfirmation,
        })
      );
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  return (
    <Container maxWidth="lg" sx={{ p: 3 }}>
      <Box sx={{ boxShadow: "none", p: 2 }}>
        <Typography component="h1" variant="h5" align="center">
          Change Password
        </Typography>
        {error && <Alert severity="info">{error?.messagge}</Alert>}
        {/* {message && <Alert severity="success">{message}</Alert>} */}
        <Box sx={{ mt: 1 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <FTextField
                name="password"
                style={{ marginBottom: "0.4rem" }}
                label="Password"
                type={showPassword ? " text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FTextField
                name="passwordConfirmation"
                label="Password Confirmation"
                type={showPasswordConfirmation ? " text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowPasswordConfirmation(!showPasswordConfirmation)
                        }
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 2, backgroundColor: "primary.darker" }}
              loading={isSubmitting || isLoading}
            >
              Save
            </LoadingButton>
          </FormProvider>
        </Box>
      </Box>
    </Container>
  );
};
export default ChangePassword;
