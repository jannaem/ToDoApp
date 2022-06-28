import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";
import EmailIcon from "@mui/icons-material/Email";
import "./Registration.css";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Divider from "../../atoms/Divider";
import { Form, Formik, FormikValues } from "formik";
import { FormModelRegistration } from "../../../Model";
import { useNavigate } from "react-router-dom";
import { RegistrationFormValidation } from "../../Validation";
import { User } from "../../../models/User";

interface State {
  password: string;
  showPassword: boolean;
  confirmedPassword: string;
  showConfirmedPassword: boolean;
}
const Registration = () => {
  const newUser : User;
  const navigate = useNavigate();
  const [pwdValues, setPwdValues] = useState<State>({
    password: "",
    showPassword: false,
    confirmedPassword: "",
    showConfirmedPassword: false,
  });

  const handleClickShowPassword = () => {
    setPwdValues({
      ...pwdValues,
      showPassword: !pwdValues.showPassword,
      showConfirmedPassword: !pwdValues.showConfirmedPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (
<<<<<<< HEAD:frontend/src/components/pages/registration/Registration.tsx
    { username, password, email, lastName, firstName}: FormikValues  ) => {
      ApiService.post("/user", params)
      .then(() => {
        navigation("/login");
        displaySnackbarMessage("Passwort wurde erfolgreich zurückgesetzt", "success")
      })
      .catch((error) => {
        displaySnackbarMessage(error.response.data, "error");
      });
=======
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => {
    <div></div>;
>>>>>>> featue/milena:frontend/src/components/pages/registration/RegistrationForm.tsx
  };

  const initialValues: FormModelRegistration = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmedPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationFormValidation}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        touched,
        isSubmitting,
        handleBlur,
      }) => (
        <Form autoComplete="off">
          <Grid container className={"registrationContainer"}>
            <Paper
              variant={"elevation"}
              elevation={5}
              className={"registrationCard"}
            >
              <Grid item>
                <Typography component="h1" variant="h3" color="primary" textAlign={"center"}>
                  <b>Sign up</b>
                </Typography>
              </Grid>
              <div className={"registrationForm"}>
                <Grid container spacing={0.8}>
                  <Grid item className="registrationField" xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      label="First Name"
                      variant="outlined"
                      name={"firstName"}
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.firstName && touched.firstName
                        ? errors.firstName
                        : null}
                      error={errors.firstName && touched.firstName ? true : false} />
                  </Grid>
                  <Grid item className="registrationField" xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      name={"lastName"}
                      value={values.lastName}
                      helperText={errors.lastName && touched.lastName
                        ? errors.lastName
                        : null}
                      error={errors.lastName && touched.lastName ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                  </Grid>
                </Grid>
                <Grid item className="registrationField" xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    label="Email"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    name={"email"}
                    value={values.email}
                    helperText={errors.email && touched.email ? errors.email : null}
                    error={errors.email && touched.email ? true : false}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                </Grid>
                <Grid item className="registrationField" xs={12} md={12}>
                  <TextField
                    fullWidth
                    required
                    label="Username"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    name={"username"}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.username && touched.username
                      ? errors.username
                      : null}
                    error={errors.username && touched.username ? true : false} />
                </Grid>
                <Grid item className="registrationField" xs={12} md={12}>
                  <TextField
                    name="password"
                    fullWidth
                    required
                    type={pwdValues.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.password && touched.password
                      ? errors.password
                      : null}
                    error={errors.password && touched.password ? true : false}
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
                    variant="outlined" />
                </Grid>
                <Grid item className="registrationField" xs={12} md={12}>
                  <TextField
                    name="confirmedPassword"
                    fullWidth
                    required
                    type={pwdValues.showConfirmedPassword ? "text" : "password"}
                    value={values.confirmedPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.confirmedPassword && touched.confirmedPassword
                      ? errors.confirmedPassword
                      : null}
                    error={errors.confirmedPassword && touched.confirmedPassword
                      ? true
                      : false}
                    label="Confirmed Password"
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
                    variant="outlined" />
                </Grid>
                <Grid item className="registrationField" xs={12} md={12}>
                  <Button
                    variant={"contained"}
                    type="submit"
                    color={"primary"}
                    fullWidth
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={"0.9rem"} /> : null}
                  >
                    create account
                  </Button>
                </Grid>
                <Divider>or</Divider>
                <Grid item className="registrationField" xs={12} md={12}>
                  <Button
                    variant={"contained"}
                    color={"secondary"}
                    disabled={isSubmitting}
                    onClick={() => navigate("/")}
                  >
                    sign in
                  </Button>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default Registration;
