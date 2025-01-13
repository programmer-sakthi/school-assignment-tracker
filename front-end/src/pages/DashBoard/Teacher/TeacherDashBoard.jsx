import React, {useState } from "react";
import DashboardOverview from './DashBoardOverview';
import InstitutionManagement from "./InstitutionManagement";
import "./TeacherDashboard.css";


const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = [
    "Dashboard",
    "Institutions",
    "Classes",
    "Sections",
    "Invitations",
    "Assignments",
    "Settings",
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
      case "Invitations":
        return <InvitationSystem />;
      case "Assignments":
        return <AssignmentPosting />;
      case "Settings":
        return <Settings />;
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

const ClassManagement = () => (
  <div>
    <h3>Manage Classes</h3>
    <p>Class management tools will go here...</p>
  </div>
);

const SectionManagement = () => (
  <div>
    <h3>Manage Sections</h3>
    <p>Section management tools will go here...</p>
  </div>
);

const InvitationSystem = () => (
  <div>
    <h3>Send Invitations</h3>
    <button className="primary-btn">Send Invite</button>
    <p>Pending invitations will go here...</p>
  </div>
);

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
