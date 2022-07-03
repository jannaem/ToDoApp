import React from "react";
import "./App.css";
<<<<<<< HEAD
import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";
=======
>>>>>>> main
import { SnackbarContextProvider } from "./contexts/SnackbarContext";
import Router from "./functional/Router";

function App() {
  return (
    <React.StrictMode>
      <SnackbarContextProvider>
        <AuthenticationContextProvider>
          <Router />
        </AuthenticationContextProvider>
      </SnackbarContextProvider>
    </React.StrictMode>
  );
}

export default App;
