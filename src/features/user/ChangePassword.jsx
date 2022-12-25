import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Container } from "@mui/system";
import { IconButton, InputAdornment, Stack } from "@mui/material";

import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateUser } from "./userSlice";

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
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { user } = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const { password, passwordConfirmation } = data;
    console.log(data);
    dispatch(
      updateUser({
        userId: user._id,
        newPassword: password,
        passwordConfirmation,
      })
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 3 }}>
        <Typography component="h1" variant="h5" align="center">
          Change Password
        </Typography>
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </FormProvider>
        </Box>
      </Box>
    </Container>
  );
};
export default ChangePassword;
