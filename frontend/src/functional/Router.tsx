import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import LoginForm from "../components/pages/login/LoginForm";
import RegistrationForm from "../components/pages/registration/RegistrationForm";
import ToDoPage from "../components/pages/toDo/ToDoPage";


const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/toDoApp" element={<ToDoPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
