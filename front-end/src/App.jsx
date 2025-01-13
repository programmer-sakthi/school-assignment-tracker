import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import DashBoard from "./pages/DashBoard/DashBoard";
import PageNotFound from "./pages/Error/PageNotFound";
import Home from "./pages/Home/Home";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
