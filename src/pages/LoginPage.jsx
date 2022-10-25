import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Container } from "@mui/system";
import { Grid, IconButton, InputAdornment, Stack } from "@mui/material";

import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    username: "",
    password: "",
  };
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    const { username, password } = data;
    const from = location?.state?.form.pathname || "/";
    auth.login(username, password, () => navigate(from, { replace: true }));
  };

  return (
    // <Grid container spacing={3}>
    //   <Grid item xs={12} md={4}>
    //     <Box sx={{ overflow: "hidden" }}>
    //       <img
    //         src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    //         alt=""
    //         style={{
    //           top: 0,
    //           left: 0,
    //           maxWidth: "100%",
    //           height: "100%",
    //           objectFit: "cover",
    //           position: "fixed",
    //         }}
    //       />
    //     </Box>
    //   </Grid>
    //   <Grid item xs={12} md={8}>
    <Container maxWidth="xs">
      <Stack alignItems="center">
        <Logo />
      </Stack>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Box sx={{ mt: 1 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FTextField
            name="username"
            label="User name"
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
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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
    //   </Grid>
    // </Grid>
  );
};
export default LoginPage;
