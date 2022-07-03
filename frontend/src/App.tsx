import React from "react";
import "./App.css";
import { SnackbarContextProvider } from "./contexts/SnackbarContext";
import Router from "./functional/Router";

function App() {
  return (
    <SnackbarContextProvider>
      <React.StrictMode>
        <div className="App">
          <Router />
        </div>
      </React.StrictMode>
    </SnackbarContextProvider>
  );
}

export default App;
