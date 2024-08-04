import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy } from "react";
import "./App.css";
import Cookies from "js-cookie";

import RootLayout from "./components/RootLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
const LoginPage = lazy(() => import("./Pages/auth/LoginPage"));
const SingupPage = lazy(() => import("./Pages/auth/SingupPage"));
import RequireAuth from "./components/auth/RequireAuth"; // Import your RequireAuth component

function App() {
  const accessToken = Cookies.get("accessToken");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<h1>Authentication App</h1>} />
          <Route path="auth">
            <Route
              path="login"
              element={
                accessToken ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path="sing-up"
              element={
                accessToken ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <SingupPage />
                )
              }
            />
          </Route>
          {/* Dashboard route protected by RequireAuth */}
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
