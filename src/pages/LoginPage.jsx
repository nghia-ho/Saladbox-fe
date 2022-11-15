import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Container } from "@mui/system";
import { Alert, IconButton, InputAdornment, Link, Stack } from "@mui/material";

import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../hooks/useAuth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    const { email, password } = data;
    const from = location?.state?.from.pathname || "/";

    try {
      await auth.login({ email, password }, () =>
        navigate(from, { replace: true })
      );
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Box sx={{ mt: 1 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.messagge}</Alert>
            )}
            <Alert severity="info">
              Don't have an account ?{"   "}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Alert>
            <FTextField
              name="email"
              label="Email"
              style={{ marginBottom: "1rem" }}
            />
            <FTextField
              name="password"
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
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </FormProvider>
      </Box>
    </Container>
  );
};
export default LoginPage;
