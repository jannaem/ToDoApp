import {
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./Login.css";
import React from "react";
import Divider from "../../atoms/Divider";
import { Form, Formik, FormikValues } from "formik";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { FormModelLogin } from "../../../Model";
import { useAuth } from "../../../contexts/AuthenticationContext";
import SnackbarContext from "../../../contexts/SnackbarContext";

interface State {
  password: string;
  showPassword: boolean;
}

const LoginForm = () => {
  const navigation = useNavigate();
  const { displaySnackbarMessage } = useContext(SnackbarContext);
  const { login } = useAuth();
  const initialValues: FormModelLogin = { username: "", password: "" };
  const [pwdValues, setPwdValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setPwdValues({
      ...pwdValues,
      showPassword: !pwdValues.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = ({ username, password }: FormikValues) => {
    login(username, password)
      .then(() => {
        navigation("/toDoApp");
        displaySnackbarMessage("Login war erfolgreich!", "success");
      })
      .catch((error) => {
        displaySnackbarMessage(error.response.data, "error");
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ values, errors, handleChange, isSubmitting }) => (
        <Form>
          <Grid container className={"loginForm"}>
            <Paper variant={"elevation"} elevation={5} className={"form"}>
              <Grid item>
                <Typography component="h1" variant="h3">
                  <b>Welcome back!</b>
                </Typography>
              </Grid>
              <Grid container spacing={1} style={{ textAlign: "center" }}>
                <div className={"form"}>
                  <Grid item className="field">
                    <TextField
                      name={"username"}
                      value={values.username}
                      fullWidth
                      required
                      variant={"outlined"}
                      label="Username"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                      {...(errors.username && { error: true })}
                      onChange={handleChange}
                      helperText={errors.username}
                    />
                  </Grid>
                  <Grid item className="field">
                    <TextField
                      name="password"
                      fullWidth
                      required
                      type={pwdValues.showPassword ? "text" : "password"}
                      value={values.password}
                      {...(errors.password && { error: true })}
                      onChange={handleChange}
                      helperText={errors.password}
                      id="outlined-basic"
                      label="Password"
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {pwdValues.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        ),
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item className="field">
                    <Button
                      variant={"contained"}
                      type="submit"
                      color={"primary"}
                      fullWidth
                      disabled={isSubmitting}
                      startIcon={
                        isSubmitting ? (
                          <CircularProgress size={"0.9rem"} />
                        ) : null
                      }
                    >
                      login
                    </Button>
                  </Grid>
                  <Divider>or</Divider>
                  <Grid item className="field">
                    <Button
                      variant={"contained"}
                      color={"secondary"}
                      disabled={isSubmitting}
                    >
                      create account
                    </Button>
                  </Grid>
                </div>
              </Grid>
            </Paper>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default LoginForm;
