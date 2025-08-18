import React from "react";
import "./index.css";
import "./style.css";
import "./components/ui/components.css";
import "./styles/auth.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/theme.css";

import { UserProvider, useUser } from "./context/user_context";
import { ThemeProvider } from "./context/theme_context";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useUser();
  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// App Routes Component (wrapped inside UserProvider)
const AppRoutes = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
