import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRouting from "./components/ProtectedRouting";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";
import PageNotFound from "./pages/Error/PageNotFound";
import Home from "./pages/Home/Home";
import DepartmentSubjects from "./pages/SampleSubjects/DepartmentSubjects";
import TeacherDashboard from "./pages/Teacher UI/Dashboard/TeacherDashboard";
import InstituteDepartmentsList from "./pages/Teacher UI/Department/InstituteDepartmentsList";
import InstituteManagement from "./pages/Teacher UI/Navigator/InstituteManagement";
import Favouirtes from "./pages/Teacher UI/Favourites/Favouirtes";
import FAQ from "./pages/Teacher UI/FAQs/FAQ";
import Assignment from "./pages/Teacher UI/Assignment/Assignment";

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
                // <ProtectedRouting>
                  <TeacherDashboard />
                // </ProtectedRouting>
              }
            />
            <Route path="/institutes" element={<InstituteManagement />} />
            <Route path="/departments" element={<InstituteDepartmentsList />} />
            <Route path="/subjects" element={<DepartmentSubjects />} />
            <Route path="/favourites" element={<Favouirtes />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/assignments" element={<Assignment />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
