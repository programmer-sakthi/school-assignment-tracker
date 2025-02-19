import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import AssignmentManagement from "./Assignment Management/AssignmentManagement";
import ClassManagement from "./Class Management/ClassManagement";
import DashboardOverview from "./DashBoardOverview";
import InstitutionManagement from "./Institute Management/InstitutionManagement";
import SectionManagement from "./Section Management/SectionManagement";
import StudentManagement from "./Student Management/StudentManagement";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const { user, onLogout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const tabs = [
    "Dashboard",
    "Institutions",
    "Classes",
    "Sections",
    "Student Management",
    "Assignments",
    "Settings",
    "Logout",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardOverview />;
      case "Institutions":
        return <InstitutionManagement />;
      case "Classes":
        return <ClassManagement />;
      case "Sections":
        return <SectionManagement />;
      case "Student Management":
        return <StudentManagement />;
      case "Assignments":
        return <AssignmentManagement />;
      case "Settings":
        return <Settings />;
      case "Logout":
        handleLogout();
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="teacher-dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-title">Teacher Dashboard</h2>
        <ul className="tab-list">
          {tabs.map((tab) => (
            <li
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </aside>

      <main className="content">{renderContent()}</main>
    </div>
  );
};

const AssignmentPosting = () => (
  <div>
    <h3>Post Assignments</h3>
    <form className="assignment-form">
      <label>
        Title:
        <input type="text" placeholder="Enter assignment title" />
      </label>
      <label>
        Description:
        <textarea placeholder="Enter assignment description"></textarea>
      </label>
      <label>
        Deadline:
        <input type="date" />
      </label>
      <button className="primary-btn" type="submit">
        Post Assignment
      </button>
    </form>
  </div>
);

const Settings = () => (
  <div>
    <h3>Settings</h3>
    <p>Settings options will go here...</p>
  </div>
);

export default TeacherDashboard;
