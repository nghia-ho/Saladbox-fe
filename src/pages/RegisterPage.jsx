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
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../hooks/useAuth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
  name: Yup.string().required("Name is required"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      await auth.register({ name, email, password }, () =>
        navigate("/", { replace: true })
      );
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box sx={{ mt: 1 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            {!!errors.responseError && (
              <Alert severity="error">{errors.responseError.messagge}</Alert>
            )}
            <Alert severity="info">
              Have an account ?{"   "}
              <Link variant="subtitle2" component={RouterLink} to="/login">
                Get started
              </Link>
            </Alert>

            <FTextField
              name="email"
              label="Email"
              style={{ marginBottom: "0.4rem" }}
            />
            <FTextField
              name="name"
              label="User Name"
              style={{ marginBottom: "0.4rem" }}
            />

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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </FormProvider>
      </Box>
    </Container>
  );
};
export default RegisterPage;
