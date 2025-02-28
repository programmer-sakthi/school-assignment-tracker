import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRouting from "./components/ProtectedRouting";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";
import PageNotFound from "./pages/Error/PageNotFound";
import Home from "./pages/Home/Home";
import InstituteDepartmentsList from "./pages/SampleClass/InstituteDepartmentsList";
import DepartmentSubjects from "./pages/SampleSubjects/DepartmentSubjects";
import TeacherDashboard from "./pages/Teacher UI/Dashboard/TeacherDashboard";
import Navbar from "./pages/Teacher UI/Layout/Navbar";
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
            <Route path="/sample1" element={<TeacherDashboard />} />
            <Route
              path="/sample2"
              element={
                <>
                  <Navbar />
                  <InstituteDepartmentsList />
                </>
              }
            />
            <Route
              path="/sample3"
              element={
                <>
                  <Navbar />
                  <DepartmentSubjects />
                </>
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
