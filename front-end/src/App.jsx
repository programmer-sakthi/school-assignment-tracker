import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRouting from "./components/ProtectedRouting";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";
import PageNotFound from "./pages/Error/PageNotFound";
import Home from "./pages/Home/Home";
import InstituteManagement from "./pages/Teacher UI/Navigator/InstituteManagement";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRouting>
                  <InstituteManagement />
                </ProtectedRouting>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
