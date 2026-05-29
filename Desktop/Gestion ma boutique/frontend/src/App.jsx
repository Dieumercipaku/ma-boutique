import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import RH from "./pages/RH";

// ================= PRIVATE ROUTE =================

function PrivateRoute({ children }) {

  const token = localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/login" />;
}

// ================= APP =================

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ================= REGISTER ================= */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* ================= EMPLOYEES ================= */}

        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          }
        />

        {/* ================= RH ================= */}

        <Route
          path="/rh"
          element={
            <PrivateRoute>
              <RH />
            </PrivateRoute>
          }
        />

        {/* ================= POS / VENTE ================= */}

        <Route
          path="/pos"
          element={
            <PrivateRoute>
              <POS />
            </PrivateRoute>
          }
        />

        {/* ================= PAGE INTROUVABLE ================= */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>
  );
}