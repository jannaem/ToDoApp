import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import Login from "../components/pages/login/Login";
import Registration from "../components/pages/registration/Registration";
import ToDoPage from "../components/pages/toDo/ToDoPage";
import ProtectedRoute from "../components/atoms/ProtectedRoute/ProtectedRoute";
import Roles from "../models/Roles";

const Router = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/toDoApp" element={<ProtectedRoute acceptedRoles={[Roles.ROLE_ADMIN, Roles.ROLE_USER]} />}>
            <Route path="/toDoApp" element={<ToDoPage />} />
          </Route>
          <Route path="/signup" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;
