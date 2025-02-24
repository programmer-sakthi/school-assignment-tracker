import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
// import { AuthContext } from "./context/AuthContext";
import ProtectedRouting from "./components/ProtectedRouting";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import DashBoard from "./pages/DashBoard/DashBoard";
import PageNotFound from "./pages/Error/PageNotFound";
import Home from "./pages/Home/Home";
import InstituteList from "./pages/Sample/InstituteList";

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
                  <DashBoard />
                </ProtectedRouting>
              }
            />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="sample"
              element={
                <ProtectedRouting>
                  <InstituteList />
                </ProtectedRouting>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
